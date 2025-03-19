import styles from "./TaskItem.module.css";
import { useNavigate } from "react-router-dom";

export default function TaskItem() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={styles.taskItemBox}
        onClick={() => {
          console.log("assad");
          navigate("/taskDetails");
        }}
      >
        <div className={styles.TaskItemInfo}>
          <div className={styles.taskTwoInfo}>
            <div className={styles.taskMedium}>
              <img src="/images/Medium.svg" alt="" />
              <p>საშუალო</p>
            </div>
            <div className={styles.taskdepartment}>
              <p>დიზაინი </p>
            </div>
          </div>
          <div className={styles.taskDate}>
            <p>12 იანვ, 2025 </p>
          </div>
        </div>
        <div className={styles.aboutTask}>
          <h3>Redberry-ს საიტის ლენდინგის დიზაინი </h3>
          <p>
            შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
            ნავიგაციას.
          </p>
        </div>
        <div className={styles.taskComentInfo}>
          <img src="/images/avatar.png" alt="" />
          <div className={styles.taskComments}>
            <img src="/images/Comments.svg" alt="" />
            <p> 8 </p>
          </div>
        </div>
      </div>
    </div>
  );
}
