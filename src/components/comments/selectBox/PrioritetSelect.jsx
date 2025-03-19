import React, { useState } from "react";
import styles from "./SelectBox.module.css";

export default function PrioritetSelect({ data }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (dep) => {
    setSelectedValue(dep);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect} onClick={toggleDropdown}>
      <div className={styles.selectedOption}>
        {selectedValue?.icon && (
          <img
            src={selectedValue.icon}
            alt={selectedValue.name}
            className={styles.icon}
          />
        )}
        {selectedValue?.name || "აირჩიეთ პრიორიტეტი"}
      </div>
      {isOpen && (
        <div className={styles.optionsList}>
          {data.map((dep) => (
            <div
              key={dep.id + dep.name}
              className={styles.option}
              onClick={() => handleSelect(dep)}
            >
              {dep.icon && (
                <img src={dep.icon} alt={dep.name} className={styles.icon} />
              )}
              {dep.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
