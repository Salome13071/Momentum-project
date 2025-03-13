import { useState } from "react";
import styles from "./Prioritet.module.css";

const checkboxesDep = [
  { id: 1, label: "მარკეტინგის დეპარტამენტი" },
  { id: 2, label: "დიზაინის დეპარტამენტი" },
  { id: 3, label: "ლოჯისტიკის დეპარტამენტი" },
  { id: 4, label: "IT დეპარტამენტი" },
];

export default function Department() {
  const [selectedDep, setSelectedDep] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (label) => {
    setCheckedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSet = () => {
    setSelectedDep(checkedItems.join(", "));
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className={styles.dropdown}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {selectedDep ? selectedDep : " დეპარტამენტი"}
      </div>

      {isDropdownOpen && (
        <div className="checkbox-window">
          {checkboxesDep.map((checkbox) => (
            <div key={checkbox.id}>
              <label>
                <input
                  type="checkbox"
                  value={checkbox.label}
                  checked={checkedItems.includes(checkbox.label)}
                  onChange={() => handleCheckboxChange(checkbox.label)}
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
