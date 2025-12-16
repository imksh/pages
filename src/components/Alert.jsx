import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const Alert = ({ name, message, fun, setShow }) => {
  return (
    <div className="w-[50%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border rounded max-w-[500px] bg-white">
      <div className="flex gap-2 bg-blue-500 text-white p-4 items-center">
        <FiAlertTriangle size={24} className="font-bold" />
        <p className="font-bold">Alert</p>
      </div>
      <div className="flex flex-col gap-4 p-4 justify-center items-center text-center">
        <FiAlertTriangle size={60} className="text-red-500 font-bold"/>
        <p className="font-bold text-2xl">{name || "Alert"}</p>
        <p>{message || "Are you sure?"}</p>
      </div>
      <div className="flex justify-between p-8">
        <button
          className="px-4 py-2 border rounded cursor-pointer  hover:bg-red-700 hover:text-white"
          onClick={() => setShow(false)}
        >
          Cancle
        </button>
        <button
          className="px-4 py-2 border rounded cursor-pointer hover:bg-green-700 hover:text-white"
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
