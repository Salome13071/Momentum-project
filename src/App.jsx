import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Dashboard />
      </main>
    </Router>
  );
}

export default App;
