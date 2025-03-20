import styles from "./AddNewTask.module.css";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../providers/DataProvider";
import SelectBox from "../../components/comments/selectBox/SelectBox";
import PrioritetSelect from "../../components/comments/selectBox/PrioritetSelect";
import { useNavigate } from "react-router-dom";

export default function AddNewTask() {
  const navigate = useNavigate();
  const {
    useAxios,
    departmentData,
    prioritetData,
    statusData,
    employeesData,
    setEmployeesData,
  } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: "",
    department: 0,
    description: "",
    employee_id: "",
    priority_id: 0,
    status_id: 0,
    due_date: "",
  });
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [localEmployeesData, setLocalEmployeesData] = useState([]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    useAxios
      .post("/tasks", {
        name: formData.name,
        description: formData.description,
        employee_id: formData.employee_id,
        priority_id: formData.priority_id,
        status_id: formData.status_id,
        due_date: formData.due_date,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleDepartmentChange = (selectedId) => {
    setFormData((prev) => ({
      ...prev,
      department: parseInt(selectedId),
    }));
    if (selectedId !== "") {
      const filteredByDepartment = employeesData.filter(
        (e) => e.department.id == selectedId
      );
      setLocalEmployeesData(filteredByDepartment);
      setIsDepartmentSelected(true);
    } else {
      setLocalEmployeesData([]);
      setIsDepartmentSelected(false);
    }
  };

  const handleEmployeeChange = (selectedId) => {
    setFormData((prev) => ({
      ...prev,
      employee_id: parseInt(selectedId),
    }));
  };

  const isValid = formData.name.length >= 2;
  const wordCount = formData.description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const isValidWord = wordCount >= 4;

  return (
    <div>
      <h1 className={styles.addNewTaskHeader}>შექმენი ახალი დავალება</h1>
      <form className={styles.formMainBox}>
        <div className={styles.taskLabels}>
          <label className={styles.headerLable}>
            <h3 className={styles.headerLableH3}>სათაური*</h3>
            <input
              type="text"
              name="name"
              required
              minLength="2"
              maxLength="255"
              value={formData.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p className={isValid ? styles.greenText : styles.redText}>
              მინიმუმ 2 სიმბოლო
            </p>
            <p className={styles.newTaskParagraph}> მაქსიმუმ 255 სიმბოლო</p>
          </label>

          <label className={styles.newTaskDep}>
            <h3 className={styles.headerLableH3}> დეპარტამენტი*</h3>
            <SelectBox
              defVal={null}
              data={departmentData}
              onChange={handleDepartmentChange}

              // onChange={(selectedId) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     department: parseInt(selectedId),
              //   }))
              // }
            />
          </label>
          <label>
            <h3 className={styles.headerLableH3}>აღწერა: </h3>
            <textarea
              name="description"
              minLength="2"
              maxLength="255"
              value={formData.description}
              onChange={handleChange}
              className={styles.taskTextarea}
            ></textarea>
            <p
              className={`${styles.newTaskParagraph} ${
                isValidWord ? styles.greenText : styles.redText
              }`}
            >
              მინიმუმ 4 სიტყვა ({wordCount} / 4)
            </p>
            <p className={styles.newTaskParagraph}> მაქსიმუმ 255 სიმბოლო</p>
          </label>
          <label className={!isDepartmentSelected ? styles.newEmploy : null}>
            <h3 className={!isDepartmentSelected ? styles.headerLableH3 : null}>
              პასუხისმგებელი თანამშრომელი*
            </h3>
            <SelectBox
              defVal={null}
              data={localEmployeesData}
              className={styles.employBox}
              onChange={handleEmployeeChange}
              // onChange={(selectedId) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     employee_id: parseInt(selectedId),
              //   }))
              // }
              isDisabled={!isDepartmentSelected}
            />
          </label>
        </div>
        <div className={styles.newTaskboxes}>
          <div className={styles.newTaskbox2}>
            <label className={styles.newTaskboxPrioritet}>
              <h3 className={styles.headerLableH3}>პრიორიტეტი* </h3>
              <PrioritetSelect
                data={prioritetData}
                onChange={(selectedId) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority_id: parseInt(selectedId),
                  }))
                }
              />
            </label>
            <label className={styles.newTaskboxStatus}>
              <h3 className={styles.headerLableH3}>სტატუსი* </h3>
              <SelectBox
                defVal={1}
                data={statusData}
                onChange={(selectedId) =>
                  setFormData((prev) => ({
                    ...prev,
                    status_id: parseInt(selectedId),
                  }))
                }
              />
            </label>
          </div>
          <div className={styles.newTaskDate}>
            <label>
              <h3 className={styles.headerLableH3}>დედლაინი</h3>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
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
