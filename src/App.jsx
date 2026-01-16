import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Error404 from "./pages/Error404";
import Wonders from "./pages/Wonders";
import Karan from "./pages/Reveal/Karan";
import Reveal from "./pages/Reveal";
import Countdown from "./pages/Countdown";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthStore from "./store/useAuthStore";
import Loading from "./components/Loading";
import Profile from "./pages/Profile";
import useUiStore from "./store/useUiStore";

const App = () => {
  const { user, isChecking, checkAuth } = useAuthStore();
  const { setShowHeader } = useUiStore();

  useEffect(() => {
    const fun = () => {
      checkAuth();
    };
    fun();
  }, []);

  if (isChecking) return <Loading />;
  return (
    <div
      onClick={() => {
        setShowHeader(false);
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />

          {/* Auth Based */}
          <Route path="/notes" element={user ? <Notes /> : <Login />} />

          {/* Public */}
          <Route path="/loveMe" element={<LoveMe />} />
          <Route path="/snake-and-ladder" element={<SnakeAndLadder />} />
          <Route path="/galary" element={<Galary />} />
          <Route path="/private/bhawna" element={<Bhawna />} />
          <Route path="/private/papa-mummy" element={<PapaMummy />} />
          <Route path="/galary/karan-galary" element={<KaranGalary />} />
          <Route path="/paint" element={<Paint />} />
          <Route path="/ludo" element={<Ludo />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/wonders" element={<Wonders />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/reveal" element={<Reveal />} />
          <Route path="/reveal/karan" element={<Karan />} />

          {/* Query Based */}
          <Route path="/countdown" element={<Countdown />} />
          <Route
            path="/countdown/:start/:date/:title/:message/:theme/:animation"
            element={<Countdown />}
          />

          {/* Error 404 */}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
