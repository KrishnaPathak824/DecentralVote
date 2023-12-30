import styles from "./VotersCandidateList.module.css";
import Navbar from "../../ui/Navbar/Navbar";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import UserItemCover from "../../ui/UserItemCover/UserItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotersCandidateList = () => {
  bouncy.register();

  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const onRemoveClicked = (removeId) => {
    setCandidateList(candidateList.filter((item) => item.voterID !== removeId));
  };

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
      setCandidateList(response.data);
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

  if (candidateList.length > 0) {
    content = candidateList.map((item) => {
      return (
        <UserItemCover
          name={item.name}
          id={item.voterID}
          onRemove={onRemoveClicked}
        />
      );
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#3c3e43"></l-bouncy>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.candidateListPageCover}>
        <VoterSidebar eid={id} />
        <div
          className={`${styles["pageContent"]} ${
            isLoading || candidateList.length === 0 ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default VotersCandidateList;
