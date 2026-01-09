import React from "react";

const Flip = ({ key, item }) => {
  return (
    <div
      key={key}
      className={`inline-flex flex-col text-[#de4848] text-5xl relative min-w-20 justify-center rounded-lg overflow-hidden`}
    >
      <div className="top  bg-[#f7f7f7] leading-none p-[0.25em] border-b border-gray-400 h-[0.75em] w-full">
        {item}
      </div>
      <div className="bottom w-full  bg-white leading-none p-[0.25em] h-[0.75em] flex items-end">
        {item}
      </div>
    </div>
  );
};

export default Flip;
