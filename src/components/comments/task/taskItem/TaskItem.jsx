import { useContext } from "react";
import styles from "./TaskItem.module.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../../providers/DataProvider";

export default function TaskItem({ data }) {
  const { useFormatDate } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className={styles.taskItemBox}>
      <div className={styles.TaskItemInfo}>
        <div className={styles.taskTwoInfo}>
          <div className={styles.taskMedium}>
            <img src={data.priority.icon} alt="" />
            <p>{data.priority.name}</p>
          </div>
          <div className={styles.taskdepartment}>
            <p>{data.department.name} </p>
          </div>
        </div>
        <div className={styles.taskDate}>
          <p>{useFormatDate(data.due_date)} </p>
        </div>
      </div>
      <div
        className={styles.aboutTask}
        onClick={() => {
          navigate("/task/details/" + data.id);
        }}
      >
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
      <div className={styles.taskComentInfo}>
        <img src={data.employee.avatar} alt="" />
        <div className={styles.taskComments}>
          <img src="/images/Comments.svg" alt="" />
          <p>{data.total_comments}</p>
        </div>
      </div>
    </div>
  );
}
