import FilterItem from "./filterItem/FilterItem";
import styles from "./Filter.module.css";
import { useContext } from "react";
import DataContext from "../../providers/DataProvider";

export default function Filter() {
  const { departmentData, statusData, employeesData } = useContext(DataContext);
  return (
    <div className={styles.filterBoxes}>
      <FilterItem title="დეპარტამენტი" data={departmentData} />
      <FilterItem title="პრიორიტეტი" data={statusData} />
      <FilterItem title="თანამშრომელი" data={employeesData} />
    </div>
  );
}
