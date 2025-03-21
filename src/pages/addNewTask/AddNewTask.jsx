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
  const [formErrors, setFormErrors] = useState({
    name: {
      desc: "",
      isValid: false,
      lenght: 0,
    },
    description: {
      desc: "",
      isValid: false,
      lenght: 0,
      wordCount: 0,
    },
    department: {
      desc: "",
      isValid: false,
    },
    employee_id: {
      desc: "",
      isValid: false,
    },
    priority_id: {
      desc: "",
      isValid: false,
    },
    status_id: {
      desc: "",
      isValid: false,
    },
    due_date: {
      desc: "",
      isValid: false,
    },
  });

  useEffect(() => {}, [formData]);
  useEffect(() => {}, [formErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    formValidation(name, value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleDepartmentChange = (key, selectedId) => {
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
    formValidation(key, parseInt(selectedId));
  };

  const handleSelectBox = (key, selectedId) => {
    if (Object.hasOwn(formData, key)) {
      setFormData((prev) => ({
        ...prev,
        [key]: parseInt(selectedId),
      }));
    }
    formValidation(key, selectedId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) return false;
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
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFormErrorState = (key, data) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const formValidation = (key, value) => {
    let isValid = false;
    switch (key) {
      case "name":
        isValid = value.length >= 2 && value.length <= 255;
        updateFormErrorState(key, {
          desc: isValid
            ? ""
            : "სათაური უნდა შეიცავდეს მინიმუმ 3 და მაქსიმუმ 255 სიმბოლოს",
          length: value.length,
          isValid,
        });
        break;
      case "description":
        const descriptionWordCount = value
          .trim()
          .split(/\s+/)
          .filter(Boolean).length;
        isValid = descriptionWordCount >= 4 && value.length <= 255;
        updateFormErrorState(key, {
          desc: isValid
            ? ""
            : "აღწერა უნდა შედგებოდეს მინიმუმ 4 სიტყვისგან და არ უნდა იყოს 255 სიმბოლოზე მეტი",
          lenght: value.length,
          wordCount: descriptionWordCount,
          isValid,
        });
        break;
      case "department":
        isValid = Number.isInteger(Number(value)) && value > 0;
        updateFormErrorState(key, {
          desc: isValid ? "" : "დეპარტამენტის არჩევა სავალდებულოა",
          isValid,
        });
        break;
      case "employee_id":
        isValid = Number.isInteger(Number(value)) && value > 0;
        updateFormErrorState(key, {
          desc: isValid ? "" : "თანამშრომლის არჩევა სავალდებულოა",
          isValid,
        });
        break;
      case "priority_id":
        isValid = Number.isInteger(Number(value)) && value > 0;
        updateFormErrorState(key, {
          desc: isValid ? "" : "პრიორიტეტის არჩევა სავალდებულოა",
          isValid,
        });
        break;
      case "status_id":
        isValid = Number.isInteger(Number(value)) && value > 0;
        updateFormErrorState(key, {
          desc: isValid ? "" : "სტატუსის არჩევა სავალდებულოა",
          isValid,
        });
        break;
      case "due_date":
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        isValid = regex.test(value);
        updateFormErrorState(key, {
          desc: isValid ? "" : "თარიღი არ არის არჩეული",
          isValid,
        });
        break;
      default:
        null;
    }
  };

  const isFormValid = () => {
    if (Object.values(formErrors).find((i) => !i.isValid)) return false;
    return true;
  };
  const maxL = 255;
  return (
    <div>
      <h1 className={styles.addNewTaskHeader}>შექმენი ახალი დავალება</h1>
      <form className={styles.formMainBox} onSubmit={handleSubmit}>
        <div className={styles.taskLabels}>
          <label className={styles.headerLable}>
            <h3 className={styles.headerLableH3}>სათაური*</h3>
            <input
              type="text"
              name="name"
              maxLength={255}
              value={formData.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <p
              className={
                formErrors.name.isValid ? styles.greenText : styles.redText
              }
            >
              მინიმუმ 2 სიმბოლო
            </p>
            <p className={styles.newTaskParagraph}>
              მაქსიმუმ
              {255 - (formErrors.name.length ? formErrors.name.length : 0)}
              სიმბოლო
            </p>
          </label>

          <label className={styles.newTaskDep}>
            <h3 className={styles.headerLableH3Dep}> დეპარტამენტი*</h3>
            <SelectBox
              idKey={"department"}
              defVal={null}
              data={departmentData}
              onChange={handleDepartmentChange}
              className={styles.emplDep}
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
                formErrors.description.isValid
                  ? styles.greenText
                  : styles.redText
              }`}
            >
              მინიმუმ 4 სიტყვა ({formErrors.description.wordCount} / 4)
            </p>
            <p className={styles.newTaskParagraph}> მაქსიმუმ 255 სიმბოლო</p>
          </label>
          <label className={!isDepartmentSelected ? styles.newEmploy : null}>
            <h3 className={!isDepartmentSelected ? styles.headerLableH3 : null}>
              პასუხისმგებელი თანამშრომელი*
            </h3>
            <SelectBox
              idKey={"employee_id"}
              defVal={null}
              data={localEmployeesData}
              className={styles.employBox}
              onChange={handleSelectBox}
              isDisabled={!isDepartmentSelected}
            />
          </label>
        </div>
        <div className={styles.newTaskboxes}>
          <div className={styles.newTaskbox2}>
            <label className={styles.newTaskboxPrioritet}>
              <h3 className={styles.headerLableH3}>პრიორიტეტი* </h3>
              <PrioritetSelect
                idKey={"priority_id"}
                data={prioritetData}
                onChange={handleSelectBox}
              />
            </label>
            <label className={styles.newTaskboxStatus}>
              <p>
                {!formErrors.status_id.isValid
                  ? formErrors.status_id.desc
                  : null}
              </p>
              <h3 className={styles.headerLableH3}>სტატუსი* </h3>
              <SelectBox
                idKey="status_id"
                defVal={1}
                data={statusData}
                onChange={handleSelectBox}
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
          <button className="" type="submit" disabled={!isFormValid()}>
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
}
