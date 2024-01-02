import styles from "./Results.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import Chart from "../../ui/PieChart/PieChart";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";

const Results = (props) => {
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
        <Sidebar />
        <div className={styles.pageContent}>
          <div className={styles.pageContentLeft}>
            <h2>Results</h2>
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

export default Results;
