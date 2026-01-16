import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";
import data from "../assets/data/pagesData.json";
import Header from "../components/Header";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import HomeCard from "../components/HomeCard";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const { user, loading, logout } = useAuthStore();

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [searchData, setSearchData] = useState(data);
  const [mainData, setMainData] = useState(data);
  useEffect(() => {
    const fun = () => {
      const updated = data.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setSearchData(updated);
    };
    fun();
  }, [input]);

  useEffect(() => {
    const fun = () => {
      const updated = data.filter((item) =>
        item.title.toLowerCase().includes(input2.toLowerCase())
      );
      setMainData(updated);
    };
    fun();
  }, [input2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
    }, 3000);

    return () => clearTimeout(interval);
  }, [index]);

  return (
    <>
      <Header
        showInfinity={true}
        heading="Pages"
        showUser={true}
        name1={user ? "" : "Home"}
        name2={user ? "" : "Login"}
        name3={user ? "" : "Register"}
        fun1={() => navigate("/")}
        fun2={() => navigate("/login")}
        fun3={() => navigate("/register")}
      />

      <div className=" w-screen flex items-center justify-center pt-[10vh] h-screen overflow-hidden">
        <div className="w-[20%] hidden md:block   h-full py-4  shadow-2xl overflow-auto hide-scrollbar">
          <div className="relative flex justify-center items-center">
            <IoSearchOutline className="absolute left-6 " />
            <input
              type="text"
              placeholder="Search"
              className="border rounded-2xl w-[90%] p-2 pl-8 outline-blue-500 active:border-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-baseline px-0 py-4 lg:px-2 gap-2 ">
            <AnimatePresence>
              {searchData.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  key={idx}
                  className="w-full flex  text-left p-2 pl-4 hover:bg-blue-100 cursor-pointer rounded-lg items-center gap-2"
                  onClick={() => navigate(item.link)}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-8 h-8 rounded-lg object-center object-cover"
                  />
                  {item.title}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="h-full items-center w-full md:w-[80%]  overflow-y-auto overflow-x-hidden hide-scrollbar">
          <motion.div
            whileTap={{ scale: 1.5 }}
            className="relative h-[150px] sm:h-[240px] md:h-[320px] w-full bg-cover bg-center overflow-hidden "
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={data[index].img}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.8 }}
                src={data[index].img}
                alt=""
                className="absolute inset-0 w-[95%] rounded-2xl h-[95%] md:h-[90%] m-auto object-cover object-center md:object-[20%_45%]"
              />

              <motion.button
                whileTap={{ scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => navigate(data[index].link)}
                className="absolute right-4 md:right-10 bottom-3 sm:bottom-10 z-10 py-2 px-4 md:px-6 md:py-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 shadow"
              >
                Visit {data[index].title}
              </motion.button>
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-col p-2 md:p-4">
            <div className="col-span-2 md:col-span-4 w-full md:w-[50%] mx-auto relative flex justify-center items-center mb-4 md:hidden">
              <IoSearchOutline className="absolute left-3 " />
              <input
                type="text"
                placeholder="Search"
                className="border rounded-2xl w-full  p-3 pl-8 outline-blue-500 active:border-0"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              />
            </div>
            <p className="text-2xl text-blue-500 font-bold mx-auto my-4 hidden md:flex">
              All Pages
            </p>
            {mainData.map((item, key) => (
              <HomeCard
                key={key}
                item={item}
                val={key % 2 === 0 ? 100 : -100}
              />
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
