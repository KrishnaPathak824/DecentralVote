import styles from "./ElectionPage.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { UserData } from "../../ui/LineChart/Data";
import LineChart from "../../ui/LineChart/LineChart";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";
import Chart from "chart.js/auto";
import axios from "axios";
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './../../utils/constants';
import { useParams } from "react-router-dom";
import {utils} from 'ethers'

const ElectionPage = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numbers,setNumbers] = useState([])
  const [signer, setSigner] = useState(null);
  const [candidate,setCandidate] = useState()
 
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [delayed, setDelayed] = useState(false);
  let voterIDs = [];
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "No of Votes",
        data: UserData.map((data) => data.votesCasted),
        fill: true,
        borderColor: "#fff",
        borderWidth: 2,
        tension: 0.3,
        hitRadius: 20,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(0 , 0 , 255 ,0.3)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(58,255,213,1)",
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: UserData.map((data) => data.year),
      },
      y: {
        beginAtZero: true,
      },
    },

    animation: {
      onComplete: () => {
        setDelayed(true);
      },
      duration: 1000, // Set the duration in milliseconds
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 50;
        }
        return delay;
      },
    },
  };


  const handleClick = async()=>{
    console.log('Button Clicked') 
    try {
      // Check if signer is initialized
      if (!signer) {
        setError("Signer is not initialized. Please try again.");
        return;
      }

      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const endElection = await contract.endElection(electionItemCtx.id)
    

  }catch(err){
    console.log('error',error)
  }
}


  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
  
    try {
      console.log('id',electionItemCtx.id)
      const response = await axios.get(
        `http://localhost:4000/election/electiondata/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      );

       // const extractedVoterIds = response.data.map(item => item.voterID);
      //  console.log('candidates', extractedVoterIds)
      setNumbers(response.data)
     
   
  
    
    
     
    } catch (error) {
     console.log('error',error)
    } 
    
  };

  const handleResult = async()=>{
    setError(null);
    setIsLoading(true);
  
    try {
      const candidateresponse = await axios.get(
        `http://localhost:4000/candidate/getcandidate/${electionItemCtx.id}`,
        {
          withCredentials: true,
        }
      )
     
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      voterIDs = candidateresponse.data.map(item => item.voterID);
      console.log('aa',voterIDs)
      const result =  await contract.getAllCandidateVotes(electionItemCtx.id, voterIDs)
        console.log('xxx',result)
      const formattedVotes = result.map(candidate => ({
       candidateId: candidate[0],
       votes: utils.formatUnits(candidate[1], 0), // Adjust the decimals as needed
     }));
     
     console.log('Formatted Votes:', formattedVotes);
     
    } catch (error) {
     console.log('error',error)
    } 
    
  }

  const initializeSigner = async () => {
    try {
      // Connect to an Ethereum node or provider
     
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

      // You can also use other providers like WalletConnectProvider, etc.

      // Get the signer using a private key or other authentication method
      const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      const wallet = new ethers.Wallet(privateKey, provider);
      console.log('wallet',wallet)
      setSigner(wallet);
      console.log('signer',signer)

    } catch (error) {
      console.error("Error initializing signer:", error);
      setError("Failed to initialize signer. Please check your connection or private key.");
    }
  };

  

  useEffect(() => {
   
    fetchData()
    initializeSigner()
 
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(58,255,213,1)");
      gradient.addColorStop(1, "rgba(0 , 0 , 255 ,0.3)");


     
      // Update the state with the new dataset including the backgroundColor
      setUserData((prevUserData) => ({
        ...prevUserData,
        datasets: [
          {
            ...prevUserData.datasets[0],
            backgroundColor: gradient,
          },
        ],
      }));
    }
    
    
    return () => {
      // Cleanup: Destroy the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
   
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.electionPageCover}>
        <Sidebar eid = {electionItemCtx.id}/>
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
                <button onClick = {handleClick}>End Election</button>
                <button onClick = {handleResult}>Results</button>
              </div>
            </div>
            <div className={styles.lineChartCover}>
              <canvas id="myChart" ref={canvasRef} className={styles.canvas} />
              <LineChart chartData={userData} chartOptions={options} />
            </div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData num = {numbers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionPage;
