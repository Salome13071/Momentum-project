import styles from "./SelectBox.module.css";

export default function SelectBox({ data, className }) {
  return (
    <div>
      <select className={`${className}`}>
        {data.map((dep) => (
          <option
            key={dep.id + dep.name}
            value={dep.id}
            onChange={() => handleDepartmentChange(dep.id)}
          >
            {dep.name}
          </option>
        ))}
      </select>
    </div>
  );
}
