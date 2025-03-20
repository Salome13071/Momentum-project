import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import AddNewTask from "./pages/addNewTask/AddNewTask";
import { DataProvider } from "./providers/DataProvider";
import TaskDetails from "./pages/task/TaskDetails";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-task" element={<AddNewTask />} />
            <Route path="/taskDetails" element={<TaskDetails />} />
          </Routes>
        </DataProvider>
      </main>
    </Router>
  );
}

export default App;
