import React from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const Reveal = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header showInfinity={true} heading="Reveal" />

      <div className="min-h-[90dvh] mt-[10vh] w-screen flex flex-col items-center justify-center bg-blue-200">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/reveal/karan")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Karan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reveal;
