import React from "react";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";

const Header = ({ heading, subHeading }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-99 bg-blue-500 text-white flex items-center justify-between px-4 md:px-8 min-h-[10dvh]">
      <div className="flex w-full gap-3  items-center h-[10dvh]">
        <Lottie
          animationData={infinity}
          loop
          autoplay
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <h2 className="text-xl md:text-2xl font-bold ">{heading}</h2>
      </div>
      <p className="">{subHeading}</p>
    </div>
  );
};

export default Header;
