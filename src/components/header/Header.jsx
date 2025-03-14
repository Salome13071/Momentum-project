import { Button } from "@mui/material";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logoImg} onClick={() => navigate("/")}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.newMember}>
          <button>
            <p> თანამშრომლის შექმნა</p>
          </button>
        </div>
        <div className={styles.newTask}>
          <button onClick={() => navigate("/new-task")}>
            <p>
              <span>+</span> შექმენი ახალი დავალება{" "}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
