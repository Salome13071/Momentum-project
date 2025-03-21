import TaskItem from "./taskItem/TaskItem";
import styles from "./Task.module.css";
import { useState, useContext, useEffect, useRef } from "react";
import DataContext from "../../../providers/DataProvider";

function filterTasks(tasksData, filters) {
  return tasksData.filter((task) => {
    const matchesDepartment =
      !filters.department ||
      filters.department.length === 0 ||
      filters.department.includes(task.department.id);
    const matchesPriority =
      !filters.priority ||
      filters.priority.length === 0 ||
      filters.priority.includes(task.priority.id);
    const matchesEmployee =
      !filters.employee ||
      filters.employee.length === 0 ||
      filters.employee.includes(task.employee.id);

    return matchesDepartment && matchesPriority && matchesEmployee;
  });
}
function getTasks(axiosInstance, setTasksData, setIsLoading) {
  axiosInstance
    .get(`/tasks`)
    .then((response) => {
      setTasksData(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}

export default function Task() {
  const { useAxios, statusData, fitlterOutputData } = useContext(DataContext);
  const [tasksData, setTasksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localTasksData, setLocalTasksData] = useState([]);
  const effectRun = useRef(false);
  const statusBgCollors = [
    { statusId: 1, color: "#f7bc30" },
    { statusId: 2, color: "#fb5607" },
    { statusId: 3, color: "#ff006e" },
    { statusId: 4, color: "#3a86ff" },
  ];

  useEffect(() => {
    if (effectRun.current === false) {
      getTasks(useAxios, setTasksData, setIsLoading);
    }
  }, []);
  useEffect(() => {
    setLocalTasksData(tasksData);
  }, [tasksData]);

  useEffect(() => {
    const filteredTasks = filterTasks(tasksData, fitlterOutputData);
    setLocalTasksData(filteredTasks);
  }, [fitlterOutputData]);

  return (
    <div className={styles.tasksMainContainer}>
      {!isLoading
        ? statusData.map((status) => (
            <div
              key={status.id + status.name}
              className={styles.tasksStatusContainer}
            >
              <div
                className={styles.taskItemName}
                style={{
                  background: statusBgCollors.find(
                    (c) => c.statusId == status.id
                  ).color,
                }}
              >
                <p>{status.name}</p>
              </div>
              <div>
                {localTasksData.map((task) => {
                  if (task.status.id === status.id)
                    return <TaskItem data={task} />;
                })}
              </div>
            </div>
          ))
        : "Loading..."}
    </div>
    // <div className={styles.tasksMainContainer}>
    //   <div className={styles.tasksStatusContainer}>
    //     <div className={styles.taskItemName}>
    //       <p>დასაწყები</p>
    //     </div>
    //     <div>
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //     </div>
    //   </div>
    //   <div className={styles.tasksStatusContainer}>
    //     <div className={styles.taskItemName2}>
    //       <p>პროგრესში</p>
    //     </div>
    //     <div>
    //       <TaskItem className={styles.taskItemName2color} />
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //     </div>
    //   </div>
    //   <div className={styles.tasksStatusContainer}>
    //     <div className={styles.taskItemName3}>
    //       <p>მზად ტესტირებისთვის</p>
    //     </div>
    //     <div>
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //     </div>
    //   </div>
    //   <div className={styles.tasksStatusContainer}>
    //     <div className={styles.taskItemName4}>
    //       <p>დასრულებული</p>
    //     </div>
    //     <div>
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //       <TaskItem />
    //     </div>
    //   </div>
    // </div>
  );
}
