import Filter from "../../components/filter/Filter";
import { FilterDataProvider } from "../../providers/FilterDataProvider";
import styles from "./Dashboard.module.css";

const checkboxesDep = [
  { id: 1, label: "მარკეტინგის დეპარტამენტი" },
  { id: 2, label: "დიზაინის დეპარტამენტი" },
  { id: 3, label: "ლოჯისტიკის დეპარტამენტი" },
  { id: 4, label: "IT დეპარტამენტი" },
];

export default function Dashboard() {
  return (
    <div>
      <div>
        <p className={styles.dashboardHeader}> დავალებების გვერდი </p>
        <div className={styles.filterBoxes}>
          <FilterDataProvider>
            <Filter title="დეპარტამენტი" data={checkboxesDep} />
            <Filter title="პრიორიტეტი" data={checkboxesDep} />
            <Filter title="თანამშრომელი" data={checkboxesDep} />
          </FilterDataProvider>
        </div>
        <div> cards</div>
      </div>
    </div>
  );
}
