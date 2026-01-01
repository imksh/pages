import React from "react";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";

const Footer = () => {
  return (
    <div
      className="flex flex-col text-[12px] gap-2 my-8 md:text-[16px] items-center justify-center p-2 text-gray-500"
      data-aos="fade-up"
    >
      <Lottie animationData={infinity} loop autoplay className="w-40 h-40" />
      <p>Crafted with ❤️ | ©️ IdioticMinds</p>
    </div>
  );
};

export default Footer;
