import React, { useState, useEffect, useRef } from "react";
import { RiCameraLensLine } from "react-icons/ri";
import { FaCamera } from "react-icons/fa6";
import { FaArrowsRotate } from "react-icons/fa6";
import Opening from "../assets/animations/opening.json";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";

function Camera() {
  const [filter, setFilter] = useState("natural");
  const cameraRef = useRef(null);
  const [timer, setTimer] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("pink");
  const [options, setOptions] = useState("filter");
  const [college, setCollege] = useState(true);
  const [rotate, setRotate] = useState(false);
  const [rear, setRear] = useState(false);
  const [closed, setClosed] = useState(true);
  const [showBtn, setShowBtn] = useState(true);
  const animationRef = useRef(null);

  const startOpen = () => {
    setShowBtn(false);
    animationRef.current?.play();

    setTimeout(() => {
      setClosed(false);
    }, 2000);
  };

  useEffect(() => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 500);
  }, [rear]);

  const canvasRef = useRef(null);

  const shutterSound = new Audio("/sounds/cameraShutter.mp3");

  const filtersData = {
    natural: "natural",
    vintage: "vintage",
    bw: "black-white",
    warm: "warm",
    cool: "cool",
    soft: "soft",
  };

  const filtersComposition = {
    natural: `brightness(100%) saturate(100%) contrast(100%)`,
    vintage: `brightness(102%) contrast(120%) sepia(55%)`,
    bw: `brightness(105%) contrast(140%) grayscale(100%)`,
    warm: `brightness(108%) saturate(135%) contrast(115%) sepia(18%)`,
    cool: `brightness(98%) saturate(120%) contrast(110%) hue-rotate(190deg)`,
    soft: `brightness(110%) saturate(105%) contrast(95%)`,
  };

  useEffect(() => {
    try {
      const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: rear
            ? { facingMode: { exact: "environment" } }
            : { facingMode: "user" },
          audio: false,
        });
        cameraRef.current.srcObject = stream;
      };
      startCamera();
    } catch (error) {
      console.log(error);
    }
  }, [show, rear]);

  const downloadImg = async () => {
    const img = await loadImage(image);
    const canvas = document.createElement("canvas");
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext("2d");
    ctx.filter = "none";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const img1 = canvas.toDataURL("image/jpeg", 0.92);
    const a = document.createElement("a");
    a.href = img1;
    const date = new Date();
    a.download = `pages-photo-booth-${date.toISOString()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateImage = async (captured, filtersUsed, w, h) => {
    try {
      console.log("start");
      console.log(filtersUsed);

      const canvas = document.createElement("canvas");

      canvas.width = w + 100;
      canvas.height = h * 3 + 100;

      setSize({ w: canvas.width, h: canvas.height });

      const ctx = canvas.getContext("2d");
      ctx.filter = "none";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img1 = await loadImage(captured[0]);
      const img2 = await loadImage(captured[1]);
      const img3 = await loadImage(captured[2]);

      ctx.filter = filtersUsed[0] || "none";
      ctx.drawImage(img1, 50, 30, w, h);
      ctx.filter = filtersUsed[1] || "none";
      ctx.drawImage(img2, 50, h + 40, w, h);
      ctx.filter = filtersUsed[2] || "none";
      ctx.drawImage(img3, 50, 2 * h + 50, w, h);
      ctx.filter = "none";

      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Photo Booth", 50, 3 * h + 80);

      const img = canvas.toDataURL("image/jpeg", 0.92);
      setImage(img);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

  const capture = async () => {
    setImage(null);
    if (!cameraRef.current) return;

    setTimer(true);
    const captured = [];
    const filtersUsed = [];
    let w = 0;
    let h = 0;
    for (let shot = 0; shot < 3; shot++) {
      for (let i = 3; i > 0; i--) {
        setCountdown(i);
        await sleep(1000);
      }
      setCountdown("Smile");
      setTimeout(() => {
        shutterSound.play();
      }, 500);

      const camera = cameraRef.current;
      const canvas = document.createElement("canvas");

      canvas.width = camera.videoWidth * 0.5;
      canvas.height = camera.videoHeight * 0.5;
      w = canvas.width;
      h = canvas.height;

      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);

      ctx.scale(-1, 1);

      ctx.filter = filtersComposition[filter];

      ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

      const img = canvas.toDataURL("image/png");

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      captured.push(img);

      filtersUsed.push(filtersComposition[filter]);
      if (!college) {
        setImage(img);
        setShow(true);
        setSize({ w: canvas.width, h: canvas.height });
        break;
      }
      await sleep(1000);
    }

    setCountdown(0);
    setTimer(false);
    setShow(true);
    await sleep(0);
    if (college) {
      generateImage(captured, filtersUsed, w, h);
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div
      className={`h-dvh w-full bg-${theme}-300 flex flex-col justify-center items-center`}
    >
      {show ? (
        <div className="container w-[90%] md:w-[550px] h-[550px] bg-black rounded-2xl relative flex justify-around items-center p-4 gap-3 text-white">
          <div className="h-full w-[60%] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt=""
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          <div className="btns flex flex-col h-full justify-around">
            <button
              className={`py-2 px-4 bg-${theme}-300 rounded-2xl hover:bg-${theme}-500 cursor-pointer`}
              onClick={downloadImg}
            >
              Donwnload
            </button>
            <button
              className={`py-2 px-4 bg-${theme}-300 rounded-2xl hover:bg-${theme}-500 cursor-pointer`}
              onClick={() => setShow(false)}
            >
              Retake
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`container w-[90%] md:w-[550px] h-[550px] bg-black rounded-2xl relative flex justify-center items-center flex-col p-4 pb-0 gap-3 overflow-hidden `}
        >
          <Lottie
            animationData={Opening}
            className={`absolute w-full scale-160 md:scale-110 h-[550px] z-20 top-0 left-0 ${
              closed ? "block" : "hidden"
            }`}
            lottieRef={animationRef}
            loop={false}
            autoplay={false}
          />
          <button
            onClick={startOpen}
            className={`bg-pink-300 text-white hover:bg-pink-500 px-6 py-2 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-40 rounded-2xl cursor-pointer ${
              showBtn ? "block" : "hidden"
            }`}
          >
            Open
          </button>
          <div className="w-[90%] md:w-[500px] h-[400px] relative">
            {timer && (
              <div
                className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-transparent z-5 text-${theme}-300 text-4xl`}
              >
                {countdown}
              </div>
            )}
            <video
              ref={cameraRef}
              autoPlay
              playsInline
              className={`camera w-full h-full rounded-2xl object-cover rotate-y-180 ${filtersData[filter]}`}
            ></video>
          </div>
          <div className="controlers grow flex flex-col gap-1 pb-2 justify-center items-center w-full  hide-scrollbar">
            {options === "filter" ? (
              <div className="filters flex overflow-auto hide-scrollbar w-full md:grid grid-cols-6 gap-3 ">
                <button
                  className={`text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "natural" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("natural")}
                >
                  Natural
                </button>
                <button
                  className={`text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "bw" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("bw")}
                >
                  B&W
                </button>
                <button
                  className={`text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "warm" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("warm")}
                >
                  Warm
                </button>
                <button
                  className={`text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "cool" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("cool")}
                >
                  Cool
                </button>
                <button
                  className={` text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "soft" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("soft")}
                >
                  Soft
                </button>
                <button
                  className={`text-white rounded py-1 px-2 cursor-pointer ${
                    filter === "vintage" ? `bg-${theme}-300 ` : ""
                  }`}
                  onClick={() => setFilter("vintage")}
                >
                  Vintage
                </button>
              </div>
            ) : (
              <div className=" flex overflow-auto hide-scrollbar w-full md:grid grid-cols-6 gap-3 py-1 ">
                <button
                  className={`text-white border-2 mx-auto  w-6 h-6 rounded-full bg-pink-300 cursor-pointer ${
                    theme === "pink" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("pink")}
                ></button>
                <button
                  className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-yellow-300 cursor-pointer ${
                    theme === "yellow" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("yellow")}
                ></button>
                <button
                  className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-blue-300 cursor-pointer ${
                    theme === "blue" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("blue")}
                ></button>
                <button
                  className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-green-300 cursor-pointer ${
                    theme === "green" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("green")}
                ></button>
                <button
                  className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-red-300 cursor-pointer ${
                    theme === "red" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("red")}
                ></button>
                <button
                  className={`text-white border-2  mx-auto  w-6 h-6 rounded-full bg-orange-300 cursor-pointer ${
                    theme === "orange" ? `border-white ` : "border-black"
                  }`}
                  onClick={() => setTheme("orange")}
                ></button>
              </div>
            )}
            <div className="text-white w-full justify-center items-center flex gap-3">
              <button
                className={`px-2 my-1 border-b-2 cursor-pointer ${
                  options === "filter" ? ` border-${theme}-300` : "border-black"
                }`}
                onClick={() => setOptions("filter")}
              >
                Filters
              </button>
              <button
                className={`px-2 my-1 border-b-2 cursor-pointer  ${
                  options === "theme" ? ` border-${theme}-300` : " border-black"
                }`}
                onClick={() => setOptions("theme")}
              >
                Themes
              </button>
            </div>
            <div className="flex items-center justify-between w-full relative min-h-14">
              <button
                className={`p-4 bg-${theme}-300 rounded-full cursor-pointer absolute left-[50%] -translate-x-[50%]`}
                onClick={capture}
                disabled={timer}
              >
                <FaCamera size={20} className="text-white" />
              </button>
              <div className="text-white flex gap-2  flex-col justify-center items-center">
                <button
                  onClick={() => setCollege(!college)}
                  className={` min-w-16 py-2 bg-${theme}-300 rounded flex flex-col justify-center items-center  cursor-pointer `}
                >
                  {college ? "College" : "Single"}
                </button>
              </div>
              <div className="text-white flex gap-2  flex-col justify-center items-center">
                <button
                  onClick={() => setRear(!rear)}
                  className={` min-w-16 flex flex-col justify-center items-center  cursor-pointer `}
                >
                  <FaArrowsRotate
                    className={`${rotate ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Camera;
