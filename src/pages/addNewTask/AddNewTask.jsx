import styles from "./AddNewTask.module.css";
import { useContext, useState } from "react";
import DataContext from "../../providers/DataProvider";
import SelectBox from "../../components/comments/selectBox/SelectBox";
import PrioritetSelect from "../../components/comments/selectBox/PrioritetSelect";

export default function AddNewTask() {
  const [department, setDepartment] = useState("");
  const { departmentData, prioritetData, statusData, employeesData } =
    useContext(DataContext);
  const handleDepartmentChange = (event) => {
    console.log(event);
  };
  return (
    <div>
      <h1 className={styles.addNewTaskHeader}>შექმენი ახალი დავალება</h1>
      <form className={styles.formMainBox}>
        <div className={styles.taskLabels}>
          <label className={styles.headerLable}>
            <h3 className={styles.headerLableH3}>სათაური*</h3>
            <input type="text" />
            <p className={styles.newTaskParagraph}> მინიმუმ 2 სიმბოლო</p>
            <p className={styles.newTaskParagraph}> მაქსიმუმ 255 სიმბოლო</p>
          </label>

          <label className={styles.newTaskDep}>
            <h3 className={styles.headerLableH3}> დეპარტამენტი*</h3>
            <SelectBox data={departmentData} />
          </label>
          <label>
            <h3 className={styles.headerLableH3}>აღწერა: </h3>
            <textarea className={styles.taskTextarea}></textarea>
            <p className={styles.newTaskParagraph}> მინიმუმ 2 სიმბოლო</p>
            <p className={styles.newTaskParagraph}> მაქსიმუმ 255 სიმბოლო</p>
          </label>
          <label className={styles.newEmploy}>
            <h3 className={styles.headerLableH3}>
              პასუხისმგებელი თანამშრომელი*
            </h3>
            <SelectBox data={employeesData} className={styles.employBox} />
          </label>
        </div>
        <div className={styles.newTaskboxes}>
          <div className={styles.newTaskbox2}>
            <label className={styles.newTaskboxPrioritet}>
              <h3 className={styles.headerLableH3}>პრიორიტეტი* </h3>
              <PrioritetSelect data={prioritetData} />
            </label>
            <label className={styles.newTaskboxStatus}>
              <h3 className={styles.headerLableH3}>სტატუსი* </h3>
              <SelectBox data={statusData} />
            </label>
          </div>
          <div className={styles.newTaskDate}>
            <label>
              <h3 className={styles.headerLableH3}>დედლაინი</h3>
              <input type="date" />
            </label>
          </div>
        </div>
        <div className={styles.AddNewTaskSubmiT}>
          <button className="" type="submit">
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
}
