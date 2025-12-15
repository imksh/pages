import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoveMe from './pages/LoveMe';
import {Toaster} from "react-hot-toast"
import Ludo from './pages/Ludo';
import Galary from './pages/Galary';
import Bhawna from './private/Bhawna';
import PapaMummy from './private/PapaMummy';
import KaranGalary from './pages/KaranGalary';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loveMe" element={<LoveMe />} />
      <Route path="/ludo" element={<Ludo />} />
      <Route path="/galary" element={<Galary />} />
      <Route path="/private/bhawna" element={<Bhawna />} />
      <Route path="/private/papa-mummy" element={<PapaMummy />} />
      <Route path="/galary/karan-galary" element={<KaranGalary />} />
    </Routes>
    <Toaster />
    </>
  );
};

export default App;
