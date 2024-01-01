import styles from "./CandidateItemCover.module.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./../../utils/constants";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const CandidateItemCover = (props) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const [signer, setSigner] = useState(null);
  const { electionid } = useParams();
  let voterIDs = [];

  const [candidateIds, setCandidateIds] = useState([]);
  useEffect(() => {
    // console.log('aa',voterIDs)

    // Your array to store candidate data

    const initializeSigner = async () => {
      try {
        // Connect to an Ethereum node or provider
        const provider = new ethers.providers.JsonRpcProvider(
          "http://127.0.0.1:8545"
        );

        // You can also use other providers like WalletConnectProvider, etc.

        // Get the signer using a private key or other authentication method
        const privateKey =
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        const wallet = new ethers.Wallet(privateKey, provider);

        setSigner(wallet);
      } catch (error) {
        console.error("Error initializing signer:", error);
        setError(
          "Failed to initialize signer. Please check your connection or private key."
        );
      }
    };

    initializeSigner();
  }, []);

  const onVoteHandler = async () => {
    // Update the local state to reflect that the user has voted
    setHasVoted(true);

    props.onVoted();

    try {
      // Check if signer is initialized
      if (!signer) {
        setError("Signer is not initialized. Please try again.");
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const getVotes = await contract.getVotes(props.eid, props.id);
      const votes = getVotes.toString(); // or use toNumber()
      console.log("Votes:", votes);
      // Check if the user has already voted by querying the smart contract
      const userHasVoted = await contract.hasUserVoted(
        props.eid,
        props.voterid
      );
      if (userHasVoted) {
        console.log("User has already voted.");

        voterIDs = props.candidate.map((item) => item.voterID);

        const result = await contract.getAllCandidateVotes(props.eid, voterIDs);

        const formattedVotes = result.map((candidate) => ({
          candidateId: candidate[0],
          votes: utils.formatUnits(candidate[1], 0), // Adjust the decimals as needed
        }));

        console.log("Formatted Votes:", formattedVotes);

        // Now candidateList contains the data for each candidate

        return;
      }

      // Trigger a transaction to vote for the selected candidate
      const transaction = await contract.vote(
        props.eid,
        props.voterid,
        props.id
      );

      await transaction.wait();

      console.log("voted");
    } catch (error) {
      console.error("Error voting:", error);
      setError(
        "An error occurred while processing your vote. Please try again."
      );
    }
  };

  return (
    <div className={styles.itemCover}>
      <div className={styles.dropColor}>
        <div className={styles.imageCover}>
          <img src="\images\add-candidate-image.png" alt="" />
        </div>
        <div className={styles.information}>
          <h3>{props.name}</h3>
          <h4 className={styles.description}>{props.id}</h4>
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={`${styles["voteBtn"]} ${hasVoted ? styles.voted : ""}`}
            onClick={onVoteHandler}
            disabled={hasVoted}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateItemCover;
