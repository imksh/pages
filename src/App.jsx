import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Purpose from "./pages/Purpose";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/purpose" element={<Purpose />} />
    </Routes>
  );
};

export default App;
