import styles from "./ParticipatedElections.module.css";
import { partElectionData } from "./partElectionData";
import { react, useState, useCallback, useEffect } from "react";
import ParticipatedElectionItem from "../../ui/ParticipatedElectionItem/ParticipatedElectionItem";
import ElectionItem from "../../ui/ElectionItem/ElectionItem";
import Navbar from "../../ui/Navbar/Navbar";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";
import axios from "axios";

const ParticipatedElections = () => {
  bouncy.register();

  const [isLoading, setIsloading] = useState(false);

  let content = <p>No Data Found</p>;

  if (partElectionData.length > 0) {
    content = partElectionData.map((item) => {
      return (
        <ParticipatedElectionItem
          title={item.electionTitle}
          organizer={item.electionOrganizer}
          sDate={item.startDate}
          eDate={item.endDate}
        />
      );
    });
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#c6c2f8"></l-bouncy>
    );
  }

  return (
    <div className={styles.cover}>
      <Navbar />
      <div className={styles.formContent}>
        <img
          className={styles.logo}
          src="\images\logo.png"
          alt="decentral vote logo"
        />

        <div
          className={`${styles["formContainer"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default ParticipatedElections;
