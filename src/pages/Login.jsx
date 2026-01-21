import { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { TbLoader2 } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoEyeClosed, GoEye } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import useAuthStore from "../store/useAuthStore";
import Header from "../components/Header";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { login, loading } = useAuthStore();
  const STATE_MACHINE = "Login Machine";
  const { rive, RiveComponent } = useRive({
    src: "/animations/loginBear.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  const isHandsUp = useStateMachineInput(rive, STATE_MACHINE, "isHandsUp");
  const isChecking = useStateMachineInput(rive, STATE_MACHINE, "isChecking");
  const trigSuccess = useStateMachineInput(rive, STATE_MACHINE, "trigSuccess");
  const trigFail = useStateMachineInput(rive, STATE_MACHINE, "trigFail");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!input.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!input.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (input.password.length < 6)
      return toast.error("Password should be at least 6 character");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (!success) return;
    const res = await login(input);
    if (res) {
      trigSuccess?.fire();
    } else {
      trigFail?.fire();
    }
  };

  const pass = () => {
    if (showPassword) {
      isHandsUp.value = true;
    } else {
      isHandsUp.value = false;
    }
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-[10dvh] bg-inherit ">
      {location === "/login" && (
        <Header
          showInfinity={true}
          heading="Pages"
          name1="Home"
          fun1={() => navigate("/")}
          name2="Register"
          fun2={() => navigate("/register")}
        />
      )}
      <div className="w-52 h-52 rounded-full overflow-hidden mx-auto my-8">
        <RiveComponent />
      </div>

      <div className="flex flex-col mx-auto justify-center items-center gap-3">
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            onFocus={() => (isChecking.value = true)}
            onBlur={() => (isChecking.value = false)}
            disabled={loading}
            className="border border-slate-300 p-3 rounded-lg placeholder-gray-400 outline-blue-500 disabled:bg-slate-200 disabled:cursor-not-allowed"
          />
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              onFocus={() => (isHandsUp.value = true)}
              onBlur={() => (isHandsUp.value = false)}
              disabled={loading}
              className="border p-3 pr-8  border-slate-300 rounded-lg placeholder-gray-400 outline-blue-500  disabled:bg-slate-200 disabled:cursor-not-allowed"
            />
            <button className="absolute right-2 " type="button" onClick={pass}>
              {showPassword ? <GoEye /> : <GoEyeClosed />}
            </button>
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 w-fit mx-auto rounded-2xl text-white mt-2 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {!loading ? "Login" : <TbLoader2 className="size-7 animate-spin" />}
          </button>
        </form>
        <div className="cursor-pointer">
          <p>
            Didn't have an account?{" "}
            <Link to="/register" className="underline text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>

      {location === "/login" && <Footer />}
      <Toaster />
    </div>
  );
};

export default Login;
