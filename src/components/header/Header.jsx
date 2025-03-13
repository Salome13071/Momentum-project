import { Button } from "@mui/material";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logoImg}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.newMember}>
          <button>
            <p> თანამშრომლის შექმნა</p>
          </button>
        </div>
        <div className={styles.newTask}>
          <button>
            <p>
              <span>+</span> შექმენი ახალი დავალება{" "}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
