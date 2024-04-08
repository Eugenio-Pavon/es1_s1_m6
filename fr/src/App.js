import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
