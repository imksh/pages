import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoveMe from "./pages/LoveMe";
import Galary from "./pages/Galary";
import Bhawna from "./private/Bhawna";
import PapaMummy from "./private/PapaMummy";
import KaranGalary from "./pages/KaranGalary";
import Paint from "./pages/Paint";
import SnakeAndLadder from "./pages/SnakeAndLadder";
import Ludo from "./pages/Ludo";
import Camera from "./pages/Camera";
import CurrencyConverter from "./pages/CurrencyConverter";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out",  mirror: true });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loveMe" element={<LoveMe />} />
        <Route path="/snake-and-ladder" element={<SnakeAndLadder />} />
        <Route path="/galary" element={<Galary />} />
        <Route path="/private/bhawna" element={<Bhawna />} />
        <Route path="/private/papa-mummy" element={<PapaMummy />} />
        <Route path="/galary/karan-galary" element={<KaranGalary />} />
        <Route path="/paint" element={<Paint />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
      </Routes>
      {/* <Toaster /> */}
    </>
  );
};

export default App;
