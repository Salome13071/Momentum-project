import FilterItem from "./filterItem/FilterItem";
import styles from "./Filter.module.css";
import { useContext } from "react";
import DataContext from "../../providers/DataProvider";

export default function Filter() {
  const { departmentData, prioritetData, employeesData } =
    useContext(DataContext);
  return (
    <div className={styles.filterBoxes}>
      <FilterItem
        title="დეპარტამენტი"
        identifier="department"
        data={departmentData}
      />
      <FilterItem
        title="პრიორიტეტი"
        identifier="priority"
        data={prioritetData}
      />
      <FilterItem
        title="თანამშრომელი"
        identifier="employee"
        data={employeesData}
      />
    </div>
  );
}
