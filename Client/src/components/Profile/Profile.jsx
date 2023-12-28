import styles from "./Profile.module.css";
import GeneralSidebar from "../../ui/GeneralSidebar/GeneralSidebar";
import Navbar from "../../ui/Navbar/Navbar";
import { myElectionData } from "./myElectionData";
import ProfilePartElecItem from "../../ui/ProfilePartItem/ProfilePartElecItem";
import { participatedElections } from "./participatedElections";
import ProfileElectionItem from "../../ui/ProfileElectionItem/ProfileElectionItem";
const Profile = () => {
  let content1 = <p>No Data Found</p>;
  let content2 = <p>No Data Found</p>;

  if (myElectionData.length > 0) {
    content1 = myElectionData.map((item) => {
      return (
        <ProfileElectionItem
          title={item.electionTitle}
          organizer={item.electionOrganizer}
        /> // ProfileElectionItem is used for My Elections
      );
    });
  }

  if (participatedElections.length > 0) {
    content2 = participatedElections.map((item) => {
      return (
        <ProfilePartElecItem
          title={item.electionTitle}
          organizer={item.electionOrganizer}
          sDate={item.startDate}
          eDate={item.endDate}
        />
      );
    });
  }
  return (
    <>
      <Navbar />
      <div className={styles.pageCover}>
        <GeneralSidebar />
        <div className={styles.pageContent}>
          <h2>Dashboard</h2>
          <div className={styles.pageUpContent}>
            <div className={styles.imageCover}>
              <img src="\images\add-candidate-image.png" alt="" />
            </div>
            <div className={styles.userInfo}>
              <h1>Sahil Ratna Tuladhar</h1>
              <h3>Kathmandu , Nepal</h3>
              <h4>98627</h4>
            </div>
          </div>
          <div className={styles.pageDownContent}>
            <div className={styles.myElections}>
              <h3>My Elections</h3>
              {content1}
            </div>
            <div className={styles.partElections}>
              <h3>Participated Elections</h3>
              {content2}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
