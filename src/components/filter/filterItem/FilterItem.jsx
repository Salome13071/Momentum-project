import { useState, useEffect, useContext } from "react";
import styles from "./FilterItem.module.css";
import DataContext from "../../../providers/DataProvider";

export default function FilterItem({ title, identifier, data }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { filterData, setFilterData, setFilterOutputData } =
    useContext(DataContext);
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setFilterData((prevState) => {
      return {
        ...prevState,
        key: title,
        value: isDropdownOpen,
      };
    });
  }, [isDropdownOpen]);

  useEffect(() => {
    if (filterData.key !== title && filterData.value) {
      if (isDropdownOpen) setIsDropdownOpen(false);
    }
  }, [filterData]);

  const handleSet = () => {
    setIsDropdownOpen(false);
    setFilterOutputData((prevState) => {
      return {
        ...prevState,
        [identifier]: checkedItems,
      };
    });
  };

  return (
    <div className={styles.filterMenuContainer}>
      <div
        className={styles.dropdown}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {title}
        <img src="/images/arrow-down.svg" alt="" />
      </div>

      {isDropdownOpen && (
        <div className={styles.checkboxWindow}>
          {data.map((checkbox) => (
            <div key={checkbox.id} className={styles.checkboxWindowLable}>
              <label>
                <input
                  key={checkbox.id + checkbox.name}
                  type="checkbox"
                  value={checkbox.id}
                  checked={checkedItems.includes(checkbox.id)}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                {identifier == "employee" ? (
                  <div className={styles.employeeInfo}>
                    <img
                      src={checkbox.avatar}
                      alt={`${checkbox.name} ${checkbox.surname}`}
                      className={styles.filterEmployeeAvatar}
                    />
                    <span>
                      {checkbox.name} {checkbox.surname}
                    </span>
                  </div>
                ) : (
                  checkbox.name
                )}
              </label>
            </div>
          ))}
          <button className={styles.selectedButton} onClick={handleSet}>
            არჩევა
          </button>
        </div>
      )}
    </div>
  );
}
