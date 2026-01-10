import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ item, key, val }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: val }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      onClick={() => navigate(item.link)}
      whileHover={{ scale: 1.01 }}
      className="w-full p-4 md:p-8 shadow my-4 rounded-2xl flex flex-col md:flex-row md:gap-8 cursor-pointer"
    >
      <img
        src={item.img}
        alt={item.title}
        className=" w-full max-h-80 md:w-60 h-auto object-contain rounded-lg hover:scale-105"
      />
      <div className="flex flex-col gap-2 grow items-baseline">
        <h1 className="text-2xl md:text-4xl font-bold mt-4 md:mt-0 text-blue-500">
          {item.title}
        </h1>
        <p className="text-left">{item.desc}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate(`/${item.link}`)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg w-fit ml-auto md:mt-auto md:mb-2 text-white cursor-pointer my-2"
        >
          Open
        </motion.button>
      </div>
    </motion.button>
  );
};

export default HomeCard;
