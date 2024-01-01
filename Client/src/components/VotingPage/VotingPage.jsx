import styles from "./VotingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import CandidateItemCover from "../../ui/CandidateItemCover/CandidateItemCover";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { contractAbi, contractAddress } from "./../../utils/constants";
const { ethers } = require("ethers");

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
      // console.log('voter', voterIdFromResponse);
      setVoterId(voterIdFromResponse);

      // Check if the voter has voted
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onVoteClicked = async () => {
    // Trigger a transaction to vote for the selected candidate
  };

  let content = <p>No Data Found</p>;

  const onAlreadyVotedError = () => {
    setHasVoted(true);
  };

  if (votingList.length > 0) {
    content = votingList.map((item) => {
      return (
        <CandidateItemCover
          key={item.id}
          candidate={votingList}
          name={item.name}
          eid={id}
          id={item.voterID}
          voterid={voterId}
          onVoted={onAlreadyVotedError}
          onVote={() => onVoteClicked(item.voterID)}
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
          <h2>Voting Page</h2>
          <div className={styles.contentCover}> {content}</div>
          <div className={styles.errorMessage}>
            {hasVoted ? <h3>You Have Already Voted</h3> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingPage;
