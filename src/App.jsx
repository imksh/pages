import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoveMe from './pages/LoveMe';
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loveMe" element={<LoveMe />} />
    </Routes>
    <Toaster />
    </>
  );
};

export default App;
