import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
