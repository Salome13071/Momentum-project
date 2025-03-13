import { useState } from "react";
import styles from "./Prioritet.module.css";

const checkboxesPrioritet = [
  { id: 1, label: "დაბალი" },
  { id: 2, label: "საშუალო" },
  { id: 3, label: "მაღალი" },
];

export default function Prioritet() {
  const [selectedPriority, setSelectedPriority] = useState("");
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
    setSelectedPriority(checkedItems.join(", "));
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className={styles.dropdown}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {selectedPriority ? selectedPriority : " პრიორიტეტი"}
      </div>

      {isDropdownOpen && (
        <div className="checkbox-window">
          {checkboxesPrioritet.map((checkbox) => (
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
