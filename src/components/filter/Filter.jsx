import FilterItem from "./filterItem/FilterItem";
import styles from "./Filter.module.css";

const checkboxesDep = [
  { id: 1, label: "მარკეტინგის დეპარტამენტი " },
  { id: 2, label: "დიზაინის დეპარტამენტი" },
  { id: 3, label: "ლოჯისტიკის დეპარტამენტი" },
  { id: 4, label: "IT დეპარტამენტი" },
];
const checkboxesDep1 = [
  { id: 1, label: "asd " },
  { id: 2, label: "asd დეპარტამენტი" },
  { id: 3, label: "asdasd დეპარტამენტი" },
  { id: 4, label: "IT asdasd" },
];

export default function Filter() {
  return (
    <div className={styles.filterBoxes}>
      <FilterItem title="დეპარტამენტი" data={checkboxesDep} />
      <FilterItem title="პრიორიტეტი" data={checkboxesDep1} />
      <FilterItem title="თანამშრომელი" data={checkboxesDep} />
    </div>
  );
}
