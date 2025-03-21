import React, { useState, useEffect } from "react";
import styles from "./SelectBox.module.css";

export default function PrioritetSelect({ idKey, data, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const defaultItem = data.find((item) => item.id === 2);
    setSelectedValue(defaultItem);
    if (defaultItem) {
      onChange(idKey, defaultItem.id);
    }
  }, [data]);

  const handleSelect = (item) => {
    setSelectedValue(item);
    setIsOpen(false);
    onChange(idKey, item.id);
  };

  return (
    <div className={styles.customSelect} onClick={toggleDropdown}>
      <div className={styles.selectedOption}>
        {selectedValue ? (
          <img
            src={selectedValue.icon}
            alt={selectedValue.name}
            className={styles.icon}
          />
        ) : null}
        {selectedValue ? selectedValue?.name : null}
        {/* <span className={styles.arrowSVG}>
          <img src="./images/arrow-down.svg" alt="" />
        </span> */}
      </div>
      {isOpen && (
        <div className={styles.optionsList}>
          {data.map((item) => (
            <div
              key={item.id + item.name}
              className={styles.option}
              onClick={() => handleSelect(item)}
            >
              {item.icon && (
                <img src={item.icon} alt={item.name} className={styles.icon} />
              )}
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
