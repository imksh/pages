import React from "react";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <div className="flex flex-col text-[12px] gap-2 my-8 md:text-[16px] items-center justify-center p-2 text-gray-500 text-center">
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
        <Lottie animationData={infinity} loop className="w-40 h-40" />
      </motion.div>
      <p>Crafted with ❤️ | ©️IdioticMinds</p>
    </div>
  );
};

export default Footer;
