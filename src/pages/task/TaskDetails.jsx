import styles from "./TaskDetails.module.css";
import DataContext from "../../providers/DataProvider";
import { useContext, useEffect, useRef, useState } from "react";
import SelectBox from "../../components/comments/selectBox/SelectBox";
import { useParams } from "react-router-dom";

function getTaskDetails(axiosInstance, id, setTaskDetails, setIsLoading) {
  axiosInstance
    .get(`/tasks/${id}`)
    .then((response) => {
      setTaskDetails(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}
function updateTaskStatus(axiosInstance, taskId, statusId) {
  axiosInstance
    .put(`/tasks/${taskId}`, {
      status_id: statusId,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function TaskDetails() {
  const { statusData, useAxios, useFormatDate } = useContext(DataContext);
  const [taskDetails, setTaskDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const effectRun = useRef(false);
  useEffect(() => {
    if (effectRun.current === false) {
      getTaskDetails(useAxios, id, setTaskDetails, setIsLoading);
    }
  }, []);
  const handleStatusChange = (key, selectedId) => {
    if (+selectedId !== +taskDetails.status.id) {
      updateTaskStatus(useAxios, taskDetails.id, selectedId);
    }
  };
  return (
    <>
      {!isLoading ? (
        <div className={styles.taskMainContainer}>
          <div className={styles.taskDetailsContainer}>
            <div className={styles.taskDescriptionContainer}>
              <div className={styles.taskDescription_details}>
                <div className={styles.taskMedium}>
                  <img src={taskDetails.priority.icon} alt="" />
                  <p>{taskDetails.priority.name}</p>
                </div>
                <div className={styles.taskdepartment}>
                  <p>{taskDetails.department.name}</p>
                </div>
              </div>

              <div className={styles.aboutTask}>
                <h1>{taskDetails.name} </h1>
                <p>{taskDetails.description}</p>
              </div>
            </div>
            <div className={styles.taskDetails}>
              <h2>დავალების დეტალები </h2>
              <div className={styles.taskDetails_items}>
                <div className={styles.status}>
                  <div className={styles.taskDetails_items_title}>
                    <img src="./images/clock.svg" alt="" />
                    <p> სტატუსი</p>
                  </div>
                  <div className={styles.statusSelect}>
                    <SelectBox
                      defVal={taskDetails.status.id}
                      data={statusData}
                      onChange={handleStatusChange}
                      className={styles.statusSelect}
                    />
                  </div>
                </div>
                <div className={styles.status}>
                  <div className={styles.taskDetails_items_title}>
                    <img src="./images/person.svg" alt="" />
                    <p> თანამშრომელი</p>
                  </div>
                  <div className={styles.emplInfo}>
                    <div>
                      <img src={taskDetails.employee.avatar} alt="" />
                    </div>
                    <div className={styles.emplInfo_titles}>
                      <p> {taskDetails.department.name}</p>
                      <h4>
                        {`${taskDetails.employee.name} ${taskDetails.employee.surname}`}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className={styles.status}>
                  <div className={styles.taskDetails_items_title}>
                    <img src="./images/calendar.svg" alt="" />
                    <p> დავალების ვადა</p>
                  </div>
                  <div>
                    <p>{useFormatDate(taskDetails.due_date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.comentsContainer}>
            <form className={styles.comentInput}>
              <input type="text" placeholder="დაწერე კომენტარი" />
              <button type="submit">დააკომენტარე</button>
            </form>
            <div className={styles.comentsBox}>
              <div className={styles.comments}>
                <h3>კომენტარები</h3>
                <label>2</label>
              </div>

              <div className={styles.coments_info}>
                <div className={styles.coments_name}>
                  <img src="./images/avatar.png" alt="" />
                  <h4>ემილია მორგანი</h4>
                </div>

                <p>
                  დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                  რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
