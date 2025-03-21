import { Button } from "@mui/material";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddNewMember from "../newMember/AddNewMember";

export default function Header() {
  const navigate = useNavigate();
  const [newMemberFormISOphen, setNewMemberFormISOphen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logoImg} onClick={() => navigate("/")}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.newMember}>
          <button onClick={() => setNewMemberFormISOphen(true)}>
            <p> თანამშრომლის შექმნა</p>
          </button>
        </div>
        {newMemberFormISOphen && (
          <AddNewMember onClose={() => setNewMemberFormISOphen(false)} />
        )}
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
