import styles from "./VoterUserItemCover.module.css"

const VoterUserItemCover = (props) => {

 const onRemoveVoterHandler = () => {
  props.onRemove(props.id)
 }

 return(
   <>
      <div className={styles.voterItemCover}>
        <div className={styles.dropColor}>
          {" "}
          <div className={styles.imageCover}>
            <img src="\images\add-candidate-image.png" alt="" />
          </div>
          <div className={styles.information}>
            <h3>{props.name}</h3>
            <h4 className={styles.description}>{props.id}</h4>
            <button className={styles.removeBtn} onClick={onRemoveVoterHandler}>
              Remove
            </button>
          </div>
        </div>{" "}
      </div>
    </>
 );
}

export default VoterUserItemCover