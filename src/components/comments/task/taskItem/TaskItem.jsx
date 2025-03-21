import { useContext, useEffect, useState } from "react";
import styles from "./TaskItem.module.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../../providers/DataProvider";

export default function TaskItem({ data }) {
  const { useFormatDate } = useContext(DataContext);
  const [priorityColor, setPriorityColor] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [departmentColor, setDepartmentColor] = useState("");
  const navigate = useNavigate();
  const statusCollors = [
    { id: 1, color: "#f7bc30" },
    { id: 2, color: "#fb5607" },
    { id: 3, color: "#ff006e" },
    { id: 4, color: "#3a86ff" },
  ];
  const departmentColors = [
    { id: 1, color: "#EB545C" },
    { id: 2, color: "#FF66A8" },
    { id: 3, color: "#f7bc30" },
    { id: 4, color: "#92EBCC" },
    { id: 5, color: "#89B6FF" },
    { id: 6, color: "#F7BC30" },
    { id: 7, color: "#FD9A6A" },
  ];
  const priorityColors = [
    { id: 1, color: "#08a508" },
    { id: 2, color: "#ffbe0b" },
    { id: 3, color: "#fa4d4d" },
  ];
  useEffect(() => {
    setStatusColor(statusCollors.find((c) => c.id == data.status.id).color);
    setPriorityColor(
      priorityColors.find((c) => c.id == data.priority.id).color
    );
    setDepartmentColor(
      departmentColors.find((d) => d.id == data.department.id).color
    );
  }, [data]);
  return (
    <div
      className={styles.taskItemBox}
      style={{
        border: `1px solid ${statusColor}`,
      }}
    >
      <div className={styles.TaskItemInfo}>
        <div className={styles.taskTwoInfo}>
          <div
            className={styles.taskMedium}
            style={{
              border: `1px solid ${priorityColor}`,
              color: priorityColor,
            }}
          >
            <img src={data.priority.icon} alt="" />
            <p>{data.priority.name}</p>
          </div>
          <div
            className={styles.taskdepartment}
            style={{
              background: departmentColor,
            }}
          >
            <p>{data.department.name.split(" ")[0]} </p>
          </div>
        </div>
        <div className={styles.taskDate}>
          <p>{useFormatDate(data.due_date)} </p>
        </div>
      </div>
      <div
        className={styles.aboutTask}
        onClick={() => {
          navigate("/task/details/" + data.id);
        }}
      >
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
      <div className={styles.taskComentInfo}>
        <img
          src={data.employee.avatar}
          alt=""
          className={styles.taskComentInfoAvatar}
        />
        <div className={styles.taskComments}>
          <img src="/images/Comments.svg" alt="" />
          <p>{data.total_comments}</p>
        </div>
      </div>
    </div>
  );
}
