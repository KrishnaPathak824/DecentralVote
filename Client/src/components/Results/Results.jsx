import styles from "./Results.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { UserData } from "../../ui/LineChart/Data";
import LineChart from "../../ui/LineChart/LineChart";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";

const Results = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);

  return (
    <>
      <Navbar />
      <div className={styles.electionResultCover}>
        <Sidebar />
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
            <div className={styles.pieChartCover}></div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
