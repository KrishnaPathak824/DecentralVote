import styles from "./VoterSidebar.module.css";
import SidebarComponent from "../SiderbarComponent/SidebarComponent";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import { Link } from "react-router-dom";

const VoterSidebar = () => {
  return (
    <div className={styles.sidebarCover}>
      <div className={styles.sidebarContents}>
        <Link to="/voter-election-page">
          <SidebarComponent
            optionTitle="Overview"
            iconTitle={<SummarizeIcon />}
          />
        </Link>

        <Link to="/voters-results-page">
          <SidebarComponent
            optionTitle="Results"
            iconTitle={<PollOutlinedIcon />}
          />
        </Link>

        <Link to="/voting-page">
          <SidebarComponent
            optionTitle="Voting"
            iconTitle={<HowToVoteOutlinedIcon />}
          />
        </Link>

        <Link to="/candidate-list">
          <SidebarComponent
            optionTitle="Candidate List"
            iconTitle={<EmojiPeopleOutlinedIcon />}
          />
        </Link>
      </div>
    </div>
  );
};

export default VoterSidebar;
