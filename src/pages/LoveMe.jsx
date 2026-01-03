import { useRef, useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Animation from "../components/Animation";
import celebrate from "../assets/animations/celebrate.json";
import heart from "../assets/animations/heart.json";
import Lottie from "lottie-react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "motion/react";
import Pookie from "../assets/animations/pookie.json";

const LoveMe = () => {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const noRef = useRef();
  const yesRef = useRef();
  const textRef = useRef();
  const heartRef = useRef();
  const acceptedRef = useRef();
  const celebrateRef = useRef();

  const handleNo = () => {
    let x = Math.random() * (width - 200);
    let y = Math.random() * (height - 100);
    setShow(false);
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 1000);

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
    setShow(false);
  };
  return (
    <>
      <div className="min-h-dvh w-screen bg-pink-400 text-white  p-10 text-center font-bold">
        <div className="flex flex-col justify-center items-center pt-[5%] ">
          <h1
            ref={textRef}
            className="text-3xl font-extrabold md:text-3xl lg:text-5xl"
          >
            Do you Love me?
          </h1>
          <div className="flex gap-4 md:gap-14 mt-10 min-w-[220px]  md:min-w-[360px] justify-baseline">
            <motion.button
              whileTap={{ scale: 0.5 }}
              className="border-2 rounded-lg h-[50px] w-[100px] md:h-[80px] md:w-[150px] bg-pink-400 cursor-pointer relative z-10"
              ref={yesRef}
              onClick={handleYes}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.5 }}
              whileHover={handleNo}
              className="border-2 cursor-pointer rounded-lg h-[50px] w-[100px] md:h-[80px] bg-pink-400 md:w-[150px] z-20"
              ref={noRef}
              onClick={handleNo}
            >
              No
            </motion.button>
          </div>
          <div className="absolute hidden " ref={celebrateRef}>
            <Lottie animationData={celebrate} loop={true} />
          </div>
          <div
            className=" flex-col justify-center items-center hidden mt-2"
            ref={heartRef}
          >
            <p
              className="hidden cursor-pointer w-full text-2xl my-4"
              ref={acceptedRef}
            >
              Love You too ❤️
            </p>
            <h1 className="text-center md:text-2xl">
              I knew you’d say yes… but I still can’t stop smiling.
            </h1>
            <Lottie animationData={heart} loop className="w-40 h-40" />
            <img src="/images/love.png" alt="" className="md:w-48 md:h-48" />
          </div>
          {show && (
            <Lottie
              animationData={Pookie}
              className="absolute bottom-24 md:bottom-1 left-[50%] scale-120 md:scale-100 -translate-x-[50%] w-100 h-100"
            />
          )}

          {showMsg && (
            <div className="absolute bottom-10 text-2xl flex items-center bg-black/50 py-3 px-5 rounded-2xl z-10">
              🙏🏻 Think again
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default LoveMe;
