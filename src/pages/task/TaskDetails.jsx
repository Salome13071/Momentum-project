import { Select } from "@mui/material";
import styles from "./TaskDetails.module.css";
import DataContext from "../../providers/DataProvider";
import { useContext } from "react";
import SelectBox from "../../components/comments/selectBox/SelectBox";

export default function TaskDetails() {
  const { statusData } = useContext(DataContext);
  return (
    <div className={styles.taskMainContainer}>
      <div className={styles.taskDetailsContainer}>
        <div className={styles.taskDescriptionContainer}>
          <div className={styles.taskDescription_details}>
            <div className={styles.taskMedium}>
              <img src="/images/Medium.svg" alt="" />
              <p>საშუალო</p>
            </div>
            <div className={styles.taskdepartment}>
              <p>დიზაინი </p>
            </div>
          </div>

          <div className={styles.aboutTask}>
            <h1>Redberry-ს საიტის ლენდინგის დიზაინი </h1>
            <p>
              მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი,
              რომელიც უზრუნველყოფს მარტივ ნავიგაციას და მკაფიო ინფორმაციის
              გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი , გამორჩეული ვიზუალით,
              მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
            </p>
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
                  defVal={null}
                  data={statusData}
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
                  <img src="./images/avatar.png" alt="" />
                </div>
                <div className={styles.emplInfo_titles}>
                  <p> დიზაინის დეპარტამენტი</p>
                  <h4> ელაია ბაგრატიონი</h4>
                </div>
              </div>
            </div>
            <div className={styles.status}>
              <div className={styles.taskDetails_items_title}>
                <img src="./images/calendar.svg" alt="" />
                <p> დავალების ვადა</p>
              </div>
              <div>
                {" "}
                <p>ორშ - 02/2/2025</p>
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
            <label>2</label>{" "}
          </div>

          <div className={styles.coments_info}>
            <div className={styles.coments_name}>
              <img src="./images/avatar.png" alt="" />
              <h4>ემილია მორგანი</h4>
            </div>

            <p>
              დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება, რომ
              ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
