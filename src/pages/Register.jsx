import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import { motion } from "motion/react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import useAuthStore from "../store/useAuthStore";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, loading } = useAuthStore();
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!validate()) {
        setIsLoading(false);
        toast.error("Form validation failed");
        return;
      }

      const isMatched = data.password === confirm;
      if (!isMatched) {
        setIsLoading(false);
        toast.error("Password didn't matched");
      }

      const res = await register(data);
      handleReset(e);
      if (res) {
        setShowAnimation(true);
      }
    } catch (error) {
      console.log("Error in registration: ", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    const error = {};
    if (!/^[A-Za-z ]+$/.test(data.name)) {
      error.name = "Please enter a valid name";
    }
    if (!/^[\w\.]+@[A-Za-z]+\.[A-Za-z]+$/.test(data.email)) {
      error.email = "Please enter a valid email address";
    }

    setErr(error);
    if (Object.keys(error).length > 0) {
      console.log(error);
      return false;
    }
    return true;
  };
  const handleReset = (e) => {
    e.preventDefault();
    setData({
      name: "",
      email: "",
      password: "",
    });

    setConfirm("");

    setShowAnimation(false);
    setErr({});
  };

  return (
    <div className="flex flex-col bg-slate-50  items-center justify-center  w-full py-8 hide-scrollbar">
      <img src={logo} className="w-30 " />
      <p className="my-5">Your digital workspace begins here.</p>
      <form
        className="w-[90%] md:w-[50%] px-4 py-8 md:p-16 rounded-2xl flex flex-col gap-2 shadow-2xl"
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleReset(e)}
      >
        <h2 className="text-center font-bold my-2 text-xl md:text-3xl text-(--color-primary)">
          Create Account
        </h2>
        <div className="w-full flex flex-col mt-4 gap-4">
          <div className="w-full flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
              className="border p-4 rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed  w-full "
              required
              disabled={isLoading}
              placeholder="Full Name"
            />
            <span className="text-red-500 text-[12px] ml-auto mr-2">
              {err.name}
            </span>
          </div>
          <div className="w-full  flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => handleChange(e)}
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full"
              required
              disabled={isLoading}
              placeholder="Email"
            />
            <span className="text-red-500 text-[12px] ml-auto mr-2">
              {err.email}
            </span>
          </div>

          <div className="flex items-center relative w-full">
            <input
              type={!showPass ? "password" : "text"}
              name="password"
              id="password"
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full "
              placeholder="Enter your password"
              value={data.password}
              required
              disabled={isLoading}
              onChange={(e) => handleChange(e)}
            />
            <button
              className="absolute right-4 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
              type="button"
            >
              {showPass ? (
                <IoMdEye className=" w-5 h-5" />
              ) : (
                <IoMdEyeOff className=" w-5 h-5" />
              )}
            </button>
          </div>
          <div className="w-full  flex flex-col">
            <input
              type="password"
              name="confirm"
              id="confirm"
              className={`border p-4  rounded-xl border-gray-300  w-full  outline-0  disabled:bg-gray-200 disabled:cursor-not-allowed ${
                confirm !== "" && confirm !== data.password
                  ? "border-red-400"
                  : ""
              }`}
              disabled={isLoading}
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {/* <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.email}
              </span> */}
          </div>
        </div>

        <div className="flex justify-around w-full my-8 gap-4 md:gap-8 border-t pt-4 px-4 border-gray-300">
          <button
            className="w-[50%] py-4 bg-red-500 hover:bg-red-700 text-white cursor-pointer  mx-auto  rounded-lg hover:scale-105 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="reset"
            disabled={isLoading}
          >
            Clear
          </button>
          <motion.button
            className={`w-[50%] py-4 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer  mx-auto rounded-lg hover:scale-105 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed items-center justify-center flex `}
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <AiOutlineLoading3Quarters className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.button>
        </div>

        <p className="mx-auto text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500 ">
            Login
          </Link>
        </p>
      </form>
      <div className="w-full my-16">
        <Footer />
      </div>

      {showAnimation && (
        <>
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%] "
          />
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%]"
          />
        </>
      )}
      <Toaster />
    </div>
  );
};

export default Register;
