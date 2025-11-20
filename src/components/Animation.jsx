import React from "react";
import Lottie from "lottie-react";

const Animation = ({ data }) => {
  return (
    <div className="w-64">
      <Lottie animationData={data} loop={true} />
    </div>
  );
};

export default Animation;
