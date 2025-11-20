import { useRef, useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Animation from "../components/Animation";
import celebrate from "../assets/animations/celebrate.json";
import heart from "../assets/animations/heart.json";
import Lottie from "lottie-react";

const Purpose = () => {
  const { width, height } = useWindowSize();
  const noRef = useRef();
  const yesRef = useRef();
  const textRef = useRef();
  const heartRef = useRef();
  const acceptedRef = useRef();
  const celebrateRef = useRef();

  const handleNo = () => {
    let x = Math.random() * (width - 200);
    let y = Math.random() * (height - 100);

    const text = textRef.current.getBoundingClientRect();
    const yes = yesRef.current.getBoundingClientRect();
    const no = noRef.current.getBoundingClientRect();

    const overlaps = (a, b) => {
      return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
      );
    };

    const newPos = {
      left: x,
      top: y,
      right: x + no.width,
      bottom: y + no.height,
    };

    if (overlaps(newPos, text) || overlaps(newPos, yes)) {
      handleNo();
      return;
    }

    noRef.current.style.position = "absolute";
    heartRef.current.style.display = "none";
    noRef.current.style.left = `${x}px`;
    noRef.current.style.top = `${y}px`;
  };

  const handleYes = () => {
    noRef.current.style.display = "none";
    yesRef.current.style.display = "none";
    acceptedRef.current.style.display = "block";
    celebrateRef.current.style.display = "block";
    heartRef.current.style.display = "flex";
  };
  return (
    <div className="min-h-screen w-screen bg-pink-400 text-white  p-10 text-center font-bold">
      <div className="flex flex-col justify-center items-center pt-[5%] ">
        <h1 ref={textRef} className="text-2xl font-extrabold md:text-3xl lg:text-5xl">Do you Love me?</h1>
        <div className="flex gap-4 md:gap-14 mt-10 min-w-[220px]  md:min-w-[360px] justify-baseline">
          <button
            className="border-2 h-[50px] w-[100px] md:h-[80px] md:w-[150px] cursor-pointer relative"
            ref={yesRef}
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="border-2 cursor-pointer h-[50px] w-[100px] md:h-[80px] md:w-[150px] z-10"
            ref={noRef}
            onClick={handleNo}
          >
            No
          </button>
          <p
            className="hidden cursor-pointer h-[80px] w-full md:text-2xl"
            ref={acceptedRef}
          >
            Love You too ❤️
          </p>
        </div>
        <div className="absolute hidden " ref={celebrateRef}>
          <Lottie animationData={celebrate} loop={true} />
        </div>
        <div
          className=" flex-col justify-center items-center hidden mt-5"
          ref={heartRef}
        >
          <h1 className="text-center md:text-2xl">I knew you’d say yes… but I still can’t stop smiling.</h1>
          <Animation data={heart} />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
