import styles from "./VotersResult.module.css";
import VoterSidebar from "../../ui/VoterSidebar/VoterSidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import ElectionItemContext from "../../contexts/electionItem-context";
import Chart from "../../ui/PieChart/PieChart";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./../../utils/constants";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const VotersResults = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signer, setSigner] = useState(null);
  const [candidate, setCandidate] = useState();
  const [voteresult,setVoteresult] = useState([])
  let voterIDs = [];
  


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

  const handleResult = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const candidateresponse = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      voterIDs = candidateresponse.data.map((item) => item.voterID);
    
      const result = await contract.getAllCandidateVotes(
        electionItemCtx.id,
        voterIDs
      );
      
      
      const formattedVotes = result.map((candidate) => ({
        candidateId: candidate[0],
        votes: utils.formatUnits(candidate[1], 0), // Adjust the decimals as needed
      }));
      setVoteresult(formattedVotes)
  
     
    } catch (error) {
      console.log("error", error);
    }
  };

  const initializeSigner = async () => {
    try {
      // Connect to an Ethereum node or provider
      const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:8545"
      );

      // Get the signer using a private key or other authentication method
      const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      const wallet = new ethers.Wallet(privateKey, provider);

      // Set the signer in the state
      setSigner(wallet);
    } catch (error) {
      console.error("Error initializing signer:", error);
      setError(
        "Failed to initialize signer. Please check your connection or private key."
      );
    }
  };

  useEffect(() => {
   
    fetchData();
    initializeSigner()
  }, []);

  useEffect(() => {
   
    handleResult()
  }, [signer]);


  return (
    <>
      <Navbar />
      <div className={styles.electionResultCover}>
        <VoterSidebar eid ={electionItemCtx.id} />
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
              <Chart id="chart" result = {voteresult} />
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
