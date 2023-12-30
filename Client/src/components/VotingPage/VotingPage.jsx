import styles from "./VotingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import CandidateItemCover from "../../ui/CandidateItemCover/CandidateItemCover";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { contractAbi, contractAddress } from './../../utils/constants';
const {ethers} = require('ethers')

const VotingPage = () => {
  const [votingList, setVotingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterId, setVoterId] = useState(); // Store the voter's unique identifier
  const { id } = useParams();

 // Replace with your contract ABI

 const fetchData = async () => {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axios.get(
      `http://localhost:4000/candidate/getcandidate/${id}`,
      {
        withCredentials: true,
      }
    );

   // const extractedVoterIds = response.data.map(item => item.voterID);
    //  console.log('candidates', extractedVoterIds)
    
    // Set the voterIDs to the state variable
    setVotingList(response.data);

    // Get the voter's unique identifier using an API call, assuming you have an endpoint for this
    const voterIdentifierResponse = await axios.get(
      `http://localhost:4000/user/profile`,
      {
        withCredentials: true,
      }
    );

    const voterIdFromResponse = voterIdentifierResponse.data.voterID;
    console.log('voter', voterIdFromResponse);
    setVoterId(voterIdFromResponse);

    // Check if the voter has voted
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    const hasVotedResponse = await contract.getVoterVote(voterIdFromResponse);
    setHasVoted(hasVotedResponse[0]);
  } catch (error) {
    console.error("Error fetching voter data:", error);

    console.log("Revert reason:", error.reason);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  fetchData();
}, []);

  const onVoteClicked = async (candidateId) => {
    if (hasVoted) {
      console.log("You have already voted");
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      // Trigger a transaction to vote for the selected candidate
      await contract.vote(voterId, candidateId);

      // Update the local state to reflect that the user has voted
      setHasVoted(true);
      console.log("Vote successful!");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };



  let content = <p>No Data Found</p>;

  if ( votingList.length > 0) {
    content = votingList.map((item) => {
      return (
        <CandidateItemCover
          key={item.id}
          name={item.name}
          id={item.id}
          onVote={() => onVoteClicked(item.id)}
        />
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className={styles.voterElectionPageCover}>
        <VoterSidebar eid={id} />
        <div
          className={`${styles["pageContent"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default VotingPage;
