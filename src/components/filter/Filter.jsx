import { useState, useEffect, useContext } from "react";
import styles from "./Prioritet.module.css";
import FilterContext from "../../providers/FilterDataProvider";

const checkboxesDep = [
  { id: 1, label: "მარკეტინგის დეპარტამენტი" },
  { id: 2, label: "დიზაინის დეპარტამენტი" },
  { id: 3, label: "ლოჯისტიკის დეპარტამენტი" },
  { id: 4, label: "IT დეპარტამენტი" },
];

export default function Filter({ title, data }) {
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
    <div>
      <div
        className={styles.dropdown}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {title}
      </div>

      {isDropdownOpen && (
        <div className="checkbox-window">
          {data.map((checkbox) => (
            <div key={checkbox.id}>
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
          <button onClick={handleSet}>არჩევა </button>
        </div>
      )}
    </div>
  );
}
