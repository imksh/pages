import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-pink-200">
      <h1 className="text-4xl font-bold mb-10">Welcome</h1>

      <div className="flex flex-col gap-5">
        <button
          onClick={() => navigate("/purpose")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Proposal Page
        </button>
      </div>
    </div>
  );
};

export default Home;
