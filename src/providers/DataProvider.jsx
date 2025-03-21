import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
} from "react";
import axios from "axios";
const token = "9e780057-7d64-47b5-9833-d278c5ee52fd";
const apiUrl = "https://momentum.redberryinternship.ge/api";
const DataContext = createContext();

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export const DataProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({ key: null, value: null });
  const [fitlterOutputData, setFilterOutputData] = useState({});
  const [departmentData, setDepartmentData] = useState([]);
  const [prioritetData, setPrioritetData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const useAxios = useMemo(() => axiosInstance);
  const useFormatDate = useMemo(() => formatDate);
  const effectRun = useRef(false);

  useEffect(() => {
    if (effectRun.current === false) {
      getStatuses(setStatusData);
      getDepartments(setDepartmentData);
      getPrioritets(setPrioritetData);
      getEmployes(setEmployeesData);
      effectRun.current = true;
    }
  }, []);
  return (
    <DataContext.Provider
      value={{
        useAxios,
        useFormatDate,
        filterData,
        departmentData,
        prioritetData,
        statusData,
        employeesData,
        fitlterOutputData,
        setFilterData,
        setFilterOutputData,
        setEmployeesData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function getStatuses(setStatusData) {
  axiosInstance
    .get(`/statuses`)
    .then((response) => {
      setStatusData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}
function getDepartments(setDepartmentData) {
  axiosInstance
    .get(`/departments`)
    .then((response) => {
      setDepartmentData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}
function getPrioritets(setPrioritetData) {
  axiosInstance
    .get(`/priorities`)
    .then((response) => {
      setPrioritetData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}
function getEmployes(setEmployeesData) {
  axiosInstance
    .get(`/employees`)
    .then((response) => {
      setEmployeesData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
}
export default DataContext;
