import styles from "./SelectBox.module.css";
import { useEffect } from "react";

export default function SelectBox({
  idKey,
  data,
  className,
  onChange,
  defVal,
  isDisabled,
}) {
  const handleChange = (event) => {
    onChange(idKey, event.target.value);
  };

  useEffect(() => {
    if (defVal) {
      const defaultItem = data.find((item) => item.id === defVal);
      if (defaultItem) {
        onChange(idKey, defaultItem.id);
      }
    }
  }, [data]);

  return (
    <div>
      <select
        className={`${className}`}
        onChange={handleChange}
        disabled={isDisabled ? "disabled" : null}
        defaultValue={defVal}
      >
        {!defVal ? <option></option> : null}

        {data.map((item) => (
          <option key={item.id + item.name} value={item.id}>
            {idKey == "employee_id"
              ? item.name + " " + item.surname
              : item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
