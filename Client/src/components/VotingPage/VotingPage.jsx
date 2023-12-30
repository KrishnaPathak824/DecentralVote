import styles from "./VotingPage.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import { votingData } from "./votingData";
import CandidateItemCover from "../../ui/CandidateItemCover/CandidateItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotingPage = () => {
  const [votingList, setVotingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // const onVoteClicked = (removeId) => {
  // votingList
  // };



  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    try {
      console.log("id", id);

      const response = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Response:", response.data);
      setVotingList(response.data);
    } catch (error) {
      console.error("Error fetching voter data:", error);
      setError(error.message); // or setError('Error fetching voter data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  let content = <p>No Data Found</p>;

  if (votingList.length > 0) {
    content = votingList.map((item) => {
      return (
        <CandidateItemCover
          name={item.name}
          id={item.id}
          // onVote={onVoteClicked}
        />
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className={styles.voterElectionPageCover}>
        <VoterSidebar eid = {id} />
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
