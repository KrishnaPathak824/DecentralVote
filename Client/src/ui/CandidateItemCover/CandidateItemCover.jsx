import styles from "./CandidateItemCover.module.css";
import { useState } from "react";

const CandidateItemCover = (props) => {
  const [isVoted, setIsVoted] = useState(false);

  const onVoteHandler = () => {
    setIsVoted(!isVoted);
    // props.onVote(props.id);
  };

  return (
    <>
      <div className={styles.itemCover}>
        <div className={styles.dropColor}>
          {" "}
          <div className={styles.imageCover}>
            <img src="\images\add-candidate-image.png" alt="" />
          </div>
          <div className={styles.information}>
            <h3>{props.name}</h3>
            <h4 className={styles.description}>{props.id}</h4>
            <button
              className={`${styles["voteBtn"]} ${isVoted ? styles.voted : ""}`}
              onClick={onVoteHandler}
            >
              {isVoted ? "Voted" : "Vote"}
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default CandidateItemCover;
