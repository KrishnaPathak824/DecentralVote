import styles from "./VotersResult.module.css";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import ElectionItemContext from "../../contexts/electionItem-context";
import Chart from "../../ui/PieChart/PieChart";

const VotersResults = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      console.log("id", electionItemCtx.id);
      const response = await axios.get(
        `http://localhost:4000/election/electiondata/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

      // const extractedVoterIds = response.data.map(item => item.voterID);
      //  console.log('candidates', extractedVoterIds)
      setNumbers(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.electionResultCover}>
        <VoterSidebar />
        <div className={styles.pageContent}>
          <div className={styles.pageContentLeft}>
            <h2>Overview</h2>
            <div className={styles.electionInfo}>
              <div className={styles.electionInfoUp}>
                <h2>{electionItemCtx.title}</h2>
              </div>
              <div className={styles.electionInfoDown}>
                <h3>{electionItemCtx.organizer}</h3>
                <div className={styles.electionDate}>
                  <CalendarTodayOutlinedIcon className={styles.icon} />
                  <p>11/30 - 12/22</p>
                </div>
              </div>
            </div>
            <div className={styles.pieChartCover}>
              <Chart id="chart" />
            </div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData num={numbers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotersResults;
