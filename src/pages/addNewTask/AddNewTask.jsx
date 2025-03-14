import styles from "./AddNewTask.module.css";

export default function AddNewTask() {
  return (
    <div>
      <h1>შექმენი ახალი დავალება</h1>
      <form className={styles.formMainBox}>
        <div className={styles.taskLabels}>
          <label className={styles.headerLable}>
            <h3>სათაური*</h3>
            <input type="text" placeholder="შეიყვანე დავალების სახელი" />
            <p> მინიმუმ 2 სიმბოლო</p>
            <p> მაქსიმუმ 255 სიმბოლო</p>
          </label>

          <label>
            დეპარტამენტი*
            <input type="select" />
          </label>
          <label>
            აღწერა:
            <textarea placeholder="დავალების დეტალები"></textarea>
          </label>
          <label>
            პასუხისმგებელი თანამშრომელი*
            <input type="select" />
          </label>
        </div>
        <div>
          <label>
            პრიორიტეტი
            <input type="text" />
          </label>
          <label>
            სტატუსი
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            დედლაინი
            <input type="date" />
          </label>
        </div>
        <button type="submit">დავალების შექმნა</button>
      </form>
    </div>
  );
}
