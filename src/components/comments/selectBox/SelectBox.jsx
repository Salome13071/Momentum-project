import styles from "./SelectBox.module.css";
import { useEffect } from "react";

export default function SelectBox({
  data,
  className,
  onChange,
  defVal,
  isDisabled,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    if (defVal) {
      const defaultItem = data.find((item) => item.id === defVal);
      if (defaultItem) {
        onChange(defaultItem.id);
      }
    }
  }, [data]);

  return (
    <div>
      <select
        className={`${className}`}
        onChange={handleChange}
        disabled={isDisabled ? "disabled" : null}
      >
        {!defVal ? <option></option> : null}

        {data.map((dep) => (
          <option
            key={dep.id + dep.name}
            value={dep.id}
            selected={defVal && dep.id === defVal ? "selected" : ""}
          >
            {dep.name}
          </option>
        ))}
      </select>
    </div>
  );
}
