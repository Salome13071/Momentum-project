import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext();
const depData = [
  {
    id: 1,
    name: "ადმინისტრაციის დეპარტამენტი",
  },
  {
    id: 2,
    name: "ადამიანური რესურსების დეპარტამენტი",
  },
  {
    id: 3,
    name: "ფინანსების დეპარტამენტი",
  },
  {
    id: 4,
    name: "გაყიდვები და მარკეტინგის დეპარტამენტი",
  },
  {
    id: 5,
    name: "ლოჯოსტიკის დეპარტამენტი",
  },
  {
    id: 6,
    name: "ტექნოლოგიების დეპარტამენტი",
  },
  {
    id: 7,
    name: "მედიის დეპარტამენტი",
  },
];
const statusDataTemp = [
  {
    id: 1,
    name: "დასაწყები",
  },
  {
    id: 2,
    name: "პროგრესში",
  },
  {
    id: 3,
    name: "მზად ტესტირებისთვის",
  },
  {
    id: 4,
    name: "დასრულებული",
  },
];
const prioritetDataTemp = [
  {
    id: 1,
    name: "დაბალი",
    icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg",
  },
  {
    id: 2,
    name: "საშუალო",
    icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg",
  },
  {
    id: 3,
    name: "მაღალი",
    icon: "https://momentum.redberryinternship.ge/storage/priority-icons/High.svg",
  },
];
const employeesDataTem = [
  {
    id: 1,
    name: "ლადო",
    surname: "გაგა",
    avatar: "",
    department_id: 3,
  },
  {
    id: 2,
    name: "თამარ",
    surname: "გაგა",
    avatar: "",
    department_id: 1,
  },
  {
    id: 3,
    name: "ანა",
    surname: "გაგა",
    avatar: "",
    department_id: 2,
  },
];
export const DataProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({ key: null, value: null });
  const [fitlterOutputData, setFilterOutputData] = useState({});
  const [departmentData, setDepartmentData] = useState(depData);
  const [prioritetData, setPrioritetData] = useState(prioritetDataTemp);
  const [statusData, setStatusData] = useState(statusDataTemp);
  const [employeesData, setEmployeesData] = useState(employeesDataTem);
  return (
    <DataContext.Provider
      value={{
        filterData,
        departmentData,
        prioritetData,
        statusData,
        employeesData,
        setFilterData,
        setFilterOutputData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
