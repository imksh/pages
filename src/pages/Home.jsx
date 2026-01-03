import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";
import data from "../assets/data/pagesData.json";
import Header from "../components/Header";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const timerRef = useRef(null);
  const [searchData, setSearchData] = useState(data);
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
    const fun = async () => {
      timerRef.current = await setTimeout(() => {
        setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
        console.log(index + 1);
      }, 3000);
    };
    fun();
    return () => clearTimeout(timerRef.current);
  }, [index]);

  return (
    <>
      <Header
        showInfinity={true}
        color="bg-blue-600"
        heading="Pages"
        name1="A collection of works"
      />
      <div className=" w-screen flex items-center justify-center pt-[10vh] h-screen overflow-hidden">
        <div className="w-[20%] hidden md:block   h-full py-4  shadow-2xl">
          <div className="relative flex justify-center items-center">
            <FaSearch className="absolute left-10 " />
            <input
              type="text"
              placeholder="Search"
              className="border rounded-2xl w-[80%] p-2 pl-8 outline-blue-500 active:border-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-baseline p-4 gap-2">
            {searchData.map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-baseline p-2 pl-4 hover:bg-blue-100 cursor-pointer rounded-lg font-bold"
                onClick={()=>navigate(item.link)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="h-full items-center w-full md:w-[80%]  overflow-auto hide-scrollbar">
          <motion.div
            whileTap={{ scale: 1.5 }}
            className="relative h-[240px] md:h-[320px] w-full bg-cover bg-center overflow-hidden "
          >
            <img
              src={data[index].img}
              alt=""
              className=" absolute inset-0  w-[95%] rounded-2xl h-[95%] md:h-[90%] m-auto object-cover object-center md:object-[20%_45%]"
            />
           
            <motion.button
              whileTap={{ scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate(data[index].link)}
              className="absolute right-4 md:right-10 bottom-10 z-10 px-4 md:px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 shadow"
            >
              Visit {data[index].title}
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center p-4">
            <p className="col-span-2 md:col-span-4 justify-center flex  items-center text-2xl font-bold text-blue-500">
              All Apps
            </p>
            {data.map((item, key) => (
              <motion.button
                whileTap={{ scale: 0.5 }}
                key={key}
                onClick={() => navigate(item.link)}
                className="md:px-6 py-3 bg-blue-500 h-full text-white rounded-md cursor-pointer hover:bg-blue-600"
              >
                {item.title}
              </motion.button>
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
