import Task from "../../components/comments/task/Task";
import Filter from "../../components/filter/Filter";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div>
      <div>
        <p className={styles.dashboardHeader}> დავალებების გვერდი </p>
        <Filter />
        <Task />
      </div>
    </div>
  );
}
