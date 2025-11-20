import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoveMe from './pages/LoveMe';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loveMe" element={<LoveMe />} />
    </Routes>
  );
};

export default App;
