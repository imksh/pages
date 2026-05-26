import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import useUiStore from "./store/useUiStore";
import Loading from "./components/Loading";

// Layouts
import {
  DefaultLayout,
  MinimalLayout,
  AuthLayout,
  ProtectedLayout,
  FullLayout,
  BirthdayLayout,
} from "./components/layouts";

// Pages - Public
import Home from "./pages/Home";
import LoveMe from "./pages/LoveMe";
import Galary from "./pages/Galary";
import KaranGalary from "./pages/KaranGalary";
import Paint from "./pages/Paint";
import SnakeAndLadder from "./pages/SnakeAndLadder";
import Ludo from "./pages/Ludo";
import Camera from "./pages/Camera";
import CurrencyConverter from "./pages/CurrencyConverter";
import Wonders from "./pages/Wonders";
import Reveal from "./pages/Reveal";
import Karan from "./pages/Reveal/Karan";
import Countdown from "./pages/Countdown";
import MatchGrid from "./pages/MatchGrid";
import ScanQR from "./pages/ScanQR";

// Pages - Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// Pages - Protected
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";

// Pages - Private
import Bhawna from "./private/Bhawna";
import PapaMummy from "./private/PapaMummy";

// Pages - Birthday
import Birthday from "./pages/birthday/Birthday";

// Error Page
import Error404 from "./pages/Error404";
import BirthdayHome from "./pages/birthday/BirthdayHome";
import { Scroll } from './components/Scroll';
import Test from "./pages/Test";

const App = () => {
  const { user, isChecking, checkAuth } = useAuthStore();
  const { setShowHeader } = useUiStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div onClick={() => setShowHeader(false)}>
      <BrowserRouter>
        <Scroll/>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/loveMe" element={<LoveMe />} />
            <Route path="/snake-and-ladder" element={<SnakeAndLadder />} />
            <Route path="/galary" element={<Galary />} />
            <Route path="/galary/karan-galary" element={<KaranGalary />} />
            <Route path="/paint" element={<Paint />} />
            <Route path="/ludo" element={<Ludo />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/wonders" element={<Wonders />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/reveal" element={<Reveal />} />
            <Route path="/reveal/karan" element={<Karan />} />
            <Route path="/match-grid" element={<MatchGrid />} />
            <Route path="/scan-qr" element={<ScanQR />} />
            <Route path="/test" element={<Test/>} />
          </Route>

          {/* ===== COUNTDOWN ROUTES ===== */}
          <Route element={<MinimalLayout />}>
            <Route path="/countdown" element={<Countdown />} />
            <Route
              path="/countdown/:start/:date/:title/:message/:theme/:animation"
              element={<Countdown />}
            />
          </Route>

          {/* ===== PRIVATE ROUTES ===== */}
          <Route element={<DefaultLayout />}>
            <Route path="/private/bhawna" element={<Bhawna />} />
            <Route path="/private/papa-mummy" element={<PapaMummy />} />
          </Route>

          {/* ===== AUTH ROUTES ===== */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ===== PROTECTED ROUTES ===== */}
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<Notes />} />
          </Route>

          {/* ===== BIRTHDAY ROUTES ===== */}
          <Route element={<BirthdayLayout />}>
            <Route path="/birthday" element={<BirthdayHome />} />
            <Route path="/birthday/:id" element={<Birthday />} />
          </Route>

          {/* ===== ERROR ROUTE ===== */}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
