import React from "react";

const ChooseTheme = ({ theme, setTheme }) => {
  return (
    <div className=" flex overflow-auto hide-scrollbar w-full md:grid grid-cols-6 gap-3 py-1 ">
      <button
        className={`text-white border-2 mx-auto  w-6 h-6 rounded-full bg-pink-300 cursor-pointer ${
          theme === "pink" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("pink")}
      ></button>
      <button
        className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-yellow-300 cursor-pointer ${
          theme === "yellow" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("yellow")}
      ></button>
      <button
        className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-blue-300 cursor-pointer ${
          theme === "blue" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("blue")}
      ></button>
      <button
        className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-green-300 cursor-pointer ${
          theme === "green" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("green")}
      ></button>
      <button
        className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-red-300 cursor-pointer ${
          theme === "red" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("red")}
      ></button>
      <button
        className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-orange-300 cursor-pointer ${
          theme === "orange" ? `border-red-500 ` : "border-white"
        }`}
        onClick={() => setTheme("orange")}
      ></button>
    </div>
  );
};

export default ChooseTheme;
