import React from "react";

import AnimationData from "../assets/animations/loadingWave.json";
import Lottie from "lottie-react";

const Loading = ({ size = "w-60 h-60", bg = "#ffffff", blur = false }) => {
  const back = bg === "transparent" ? "bg-transparent" : `${bg}`;
  const blurClass = blur ? "backdrop-blur-sm" : "";

  
  return (
    <div
      className={`flex h-full w-full absolute top-0 left-0 justify-center items-center ${back} ${blurClass}`}
    >
      <Lottie animationData={AnimationData} loop className={size} />
    </div>
  );
};

export default Loading;
