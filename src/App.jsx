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
      <DataProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-task" element={<AddNewTask />} />
            <Route path="/task/details/:id" element={<TaskDetails />} />
          </Routes>
        </main>
      </DataProvider>
    </Router>
  );
}

export default App;
