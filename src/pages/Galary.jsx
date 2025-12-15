import React from "react";
import { useNavigate } from "react-router-dom";

const Galary = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-blue-600 text-white h-[10vh] w-full fixed top-0 left-0 flex items-center px-2 lg:px-10 justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl lg:text-3xl font-bold">Galary</h1>
        </div>
        <p className="hidden lg:block font-bold"></p>
      </div>

      <div className="min-h-[90dvh] mt-[10vh] w-screen flex flex-col items-center justify-center bg-blue-200">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/galary/karan-galary")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Karan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Galary;
