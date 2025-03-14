import { useState, useEffect, useContext } from "react";
import styles from "./FilterItem.module.css";
import FilterContext from "../../../providers/FilterDataProvider";

export default function FilterItem({ title, data }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { filterData, setFilterData, setFilterOutputData } =
    useContext(FilterContext);
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
        [title]: checkedItems,
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
                  type="checkbox"
                  value={checkbox.id}
                  checked={checkedItems.includes(checkbox.id)}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                {checkbox.label}
              </label>
            </div>
          ))}
          <button className={styles.selectedButton} onClick={handleSet}>
            არჩევა{" "}
          </button>
        </div>
      )}
    </div>
  );
}
