import styles from "./VotingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import { votingData } from "./votingData";
import CandidateItemCover from "../../ui/CandidateItemCover/CandidateItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";

const VotingPage = () => {
  const [votingList, setVotingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const onVoteClicked = (removeId) => {
  // votingList
  // };

  useEffect(() => {
    setVotingList(votingData);
  }, []);

  let content = <p>No Data Found</p>;

  if (votingList.length > 0) {
    content = votingList.map((item) => {
      return (
        <CandidateItemCover
          name={item.cName}
          id={item.cId}
          // onVote={onVoteClicked}
        />
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className={styles.voterElectionPageCover}>
        <VoterSidebar />
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
