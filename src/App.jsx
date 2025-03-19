import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import AddNewTask from "./pages/addNewTask/AddNewTask";
import { DataProvider } from "./providers/DataProvider";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-task" element={<AddNewTask />} />
          </Routes>
        </DataProvider>
      </main>
    </Router>
  );
}

export default App;
