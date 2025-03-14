import Task from "../../components/comments/task/Task";
import Filter from "../../components/filter/Filter";
import { FilterDataProvider } from "../../providers/FilterDataProvider";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div>
      <div>
        <p className={styles.dashboardHeader}> დავალებების გვერდი </p>
        <FilterDataProvider>
          <Filter />
          <Task />
        </FilterDataProvider>
      </div>
    </div>
  );
}
