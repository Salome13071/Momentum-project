import { useState } from "react";
import styles from "./Prioritet.module.css";

const checkboxesEmpl = [
  { id: 1, label: "ანა გაგუა" },
  { id: 2, label: "ელენე ბერაია " },
  { id: 3, label: "გიორგი ბერიძე " },
];

export default function Employer() {
  const [selectedEmpl, setSelectedEmpl] = useState("");
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
    setSelectedEmpl(checkedItems.join(", "));
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className={styles.dropdown}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {selectedEmpl ? selectedEmpl : " თანამშრომელი"}
      </div>

      {isDropdownOpen && (
        <div className="checkbox-window">
          {checkboxesEmpl.map((checkbox) => (
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
