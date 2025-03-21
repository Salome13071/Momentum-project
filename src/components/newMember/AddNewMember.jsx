import { useContext, useEffect, useState } from "react";
import styles from "./AddNewMember.module.css";
import DataContext from "../../providers/DataProvider";
import SelectBox from "../comments/selectBox/SelectBox";

export default function AddNewMember({ onClose }) {
  const MAX_FILE_SIZE = 600 * 1024; // 600KB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const { useAxios, departmentData } = useContext(DataContext);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    department_id: "",
    avatar: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: { desc: "", length: 0, isValid: false },
    surname: { desc: "", length: 0, isValid: false },
    department_id: { desc: "", isValid: false },
    avatar: { desc: "", isValid: false },
  });

  useEffect(() => {}, [formErrors]);
  useEffect(() => {}, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    formValidation(name, value);
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

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (!ALLOWED_TYPES.includes(file.type)) {
      formValidation("avatar", {
        isValid: false,
        desc: `ასატვირთი ფაილის ტიპი უნდა იყოს ${ALLOWED_TYPES.join(",")}`,
      });
      return;
    }
    if (MAX_FILE_SIZE < file.size) {
      formValidation("avatar", {
        isValid: false,
        desc: `ასატვირთი ფაილის ზომა არ უნდა აღემატებოდეს ${
          MAX_FILE_SIZE / 1024
        } კილობაიტს`,
      });
      return;
    }
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      updateFormErrorState("avatar", file);
      setAvatar(URL.createObjectURL(file));
      formValidation("avatar", {
        isValid: true,
        desc: "",
      });
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      alert("გთხოვთ, შეავსეთ ფორმა სწორად");
      return;
    }
    const requestFormData = new FormData();
    requestFormData.append("avatar", formData.avatar);
    requestFormData.append("name", formData.name);
    requestFormData.append("surname", formData.surname);
    requestFormData.append("department_id", formData.department_id);
    useAxios
      .post("/employees", requestFormData)
      .then((response) => {
        console.log("Form submitted:", response);
        onClose("success");
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
      case "surname":
        isValid = value.length >= 2 && value.length <= 255;
        updateFormErrorState(key, {
          desc: isValid ? "" : "მინიმუმ 2 და მაქსიმუმ 255 სიმბოლო",
          length: value.length,
          isValid,
        });
        break;
      case "department_id":
        isValid = Number.isInteger(Number(value)) && value > 0;
        updateFormErrorState(key, {
          desc: isValid ? "" : "დეპარტამენტის არჩევა სავალდებულოა",
          isValid,
        });
        break;
      case "avatar":
        isValid = value.isValid;
        updateFormErrorState(key, {
          desc: isValid ? "" : value.desc,
          isValid,
        });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return Object.values(formErrors).every((error) => error.isValid);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.mainContainer}>
        <div className={styles.closeButton} onClick={onClose}>
          <img src="./images/Cancel.svg" alt="Cancel" />
        </div>
        <div className={styles.newMemberInfo}>
          <h1>თანამშრომლის დამატება</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.nameSurnamebox}>
              <div className={styles.nameSurname_inputs}>
                <label className={styles.headerLabel}>
                  <h3>სახელი*</h3>
                  <input
                    type="text"
                    name="name"
                    maxLength={255}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <p className={styles.formSurnamesError}>
                    {formErrors.name.desc}
                  </p>
                  <p className={styles.newTaskParagraph}>
                    {255 - formErrors.name.length} სიმბოლო დარჩა
                  </p>
                </label>
              </div>
              <div className={styles.nameSurname_inputs}>
                <label className={styles.headerLabel}>
                  <h3>გვარი*</h3>
                  <input
                    type="text"
                    name="surname"
                    maxLength={255}
                    value={formData.surname}
                    onChange={handleChange}
                  />
                  <p className={styles.formSurnamesError}>
                    {formErrors.surname.desc}
                  </p>
                  <p className={styles.newTaskParagraph}>
                    {255 - formErrors.surname.length} სიმბოლო დარჩა
                  </p>
                </label>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className={styles.avatarInput}>
              <label>ავატარი*</label>
              <div className={styles.avatarBox}>
                {avatar ? (
                  <>
                    <img
                      src={avatar}
                      alt="Avatar"
                      className={styles.avatarImage}
                    />
                    <button
                      type="button"
                      className={styles.deleteAvatar}
                      onClick={removeAvatar}
                    >
                      <img src="./images/trash-2.svg" alt="" />
                    </button>
                  </>
                ) : (
                  <input
                    type="file"
                    onChange={handleAvatarUpload}
                    className={styles.avatarImgInput}
                  />
                )}
              </div>
              <div className={styles.avatarErroreText}>
                {formErrors.avatar.isValid ? "" : formErrors.avatar.desc}
              </div>
            </div>

            {/* Department */}
            <div className={styles.departmentInput}>
              <label>დეპარტამენტი*</label>
              <SelectBox
                defVal={null}
                idKey={"department_id"}
                data={departmentData}
                onChange={handleSelectBox}
                className={styles.departmentInput_input}
              />
              <p
                className={
                  formErrors.department_id.isValid
                    ? styles.greenText
                    : styles.redText
                }
              >
                {formErrors.department_id.desc}
              </p>
            </div>

            {/* Buttons */}
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isFormValid()}
              >
                დაამატე თანამშრომელი
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
