import Snackbar from "@mui/material/Snackbar";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import AddNewMember from "../newMember/AddNewMember";
import Alert from "@mui/material/Alert";

export default function Header() {
  const navigate = useNavigate();
  const [newMemberFormIsOpen, setNewMemberFormIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoImg} onClick={() => navigate("/")}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.newMember}>
          <button onClick={(val) => setNewMemberFormIsOpen(true)}>
            <p> თანამშრომლის შექმნა</p>
          </button>
        </div>
        {newMemberFormIsOpen && (
          <AddNewMember
            onClose={(val) => {
              setNewMemberFormIsOpen(false);
              if (val == "success") {
                setOpen(true);
              }
            }}
          />
        )}
        <div className={styles.newTask}>
          <button onClick={() => navigate("/new-task")}>
            <p>
              <span>+</span> შექმენი ახალი დავალება{" "}
            </p>
          </button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            თანამშრომელი წარმატებით დაემატა!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
