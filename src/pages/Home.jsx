import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-blue-600 text-white h-[10vh] w-full fixed top-0 left-0 flex items-center px-2 lg:px-10 justify-between">
        <div className="flex gap-3 items-center">
          <Lottie animationData={infinity} loop={true} className="w-12 lg:w-16" />
          <h1 className="text-2xl lg:text-3xl font-bold">Pages</h1>
        </div>
        <p className="hidden lg:block font-bold">A Collection of Works</p>
      </div>
      <div className="min-h-[90dvh] w-screen flex flex-col items-center justify-center bg-blue-200 mt-[10vh]">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/loveMe")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Love Me?
          </button>
          <button
            onClick={() => navigate("/snake-and-ladder")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Snake & Ladder
          </button>
          <button
            onClick={() => navigate("/galary")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Galary
          </button>
          <button
            onClick={() => navigate("/paint")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Paint
          </button>

          <button
            onClick={() => navigate("/camera")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Camera
          </button>
         
        </div>
      </div>
      
      

      {/* <div className="absolute bottom-0 left-[5%] border-t w-[90%] p-4 flex justify-center items-center">
        <p>©️ IdioticMinds</p>
      </div> */}
    </div>
  );
};

export default Home;
