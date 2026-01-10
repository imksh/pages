import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";

const Alert = ({ name, message, fun, setShow }) => {
  return (
    <div className="w-[90%] lg:w-[50%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border rounded max-w-[500px] bg-white z-99">
      <div className="flex gap-2 bg-blue-500 text-white p-4 items-center">
        <FiAlertTriangle size={24} className="font-bold" />
        <p className="font-bold">Alert</p>
      </div>
      <div className="flex flex-col gap-4 p-4 justify-center items-center text-center">
        <Lottie animationData={infinity} loop={true} className="w-12 lg:w-16" />
        <p className="font-bold text-3xl text-blue-600">{name || "Alert"}</p>
        <p>{message || "Are you sure?"}</p>
      </div>
      <div className="flex justify-between p-8">
        <button
          className="px-4 py-2 border rounded cursor-pointer  bg-red-600  hover:bg-red-500 text-white font-bold"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 border rounded cursor-pointer bg-blue-500 hover:bg-green-700 text-white font-black"
          onClick={() => {
            if (fun) fun();
            setShow(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Alert;
