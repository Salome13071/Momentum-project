import TaskItem from "./taskItem/TaskItem";
import styles from "./Task.module.css";

export default function Task() {
  return (
    <div className={styles.tasksMainContainer}>
      <div className={styles.tasksStatusContainer}>
        <div className={styles.taskItemName}>
          <p>დასაწყები</p>
        </div>
        <div>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
      <div className={styles.tasksStatusContainer}>
        <div className={styles.taskItemName2}>
          <p>პროგრესში</p>
        </div>
        <div>
          <TaskItem className={styles.taskItemName2color} />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
      <div className={styles.tasksStatusContainer}>
        <div className={styles.taskItemName3}>
          <p>მზად ტესტირებისთვის</p>
        </div>
        <div>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
      <div className={styles.tasksStatusContainer}>
        <div className={styles.taskItemName4}>
          <p>დასრულებული</p>
        </div>
        <div>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
    </div>
  );
}
