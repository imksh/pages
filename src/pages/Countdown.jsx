import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Flip from "../components/Flip";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import Pookie from "../assets/animations/pookie.json";
import Heart from "../assets/animations/heart.json";
import celebrate from "../assets/animations/celebrate.json";
import infinity from "../assets/animations/infinity.json";
import ChooseTheme from "../components/ChooseTheme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const animations = [
  { id: "1", animation: Pookie },
  { id: "2", animation: Heart },
  { id: "3", animation: infinity },
];

const themeMap = {
  pink: "bg-pink-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  red: "bg-red-400",
  orange: "bg-orange-400",
};

const Countdown = () => {
  //initial required data and functiions
  const navigate = useNavigate();
  const { message, title, theme, date, animation } = useParams();
  const width = window.innerWidth;
  const toDateTimeLocal = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  //useStates
  const [showAnimation, setShowAnimation] = useState(
    animations.find((a) => a.id === animation) || animations[0]
  );
  const [dev, setDev] = useState(false);
  const [selectTheme, setSelectTheme] = useState("blue");
  const [done, setDone] = useState(false);
  const [selectTime, setSelectTime] = useState(toDateTimeLocal(new Date()));
  const [input, setInput] = useState({
    time: selectTime,
    title: "",
    message: "",
    theme: theme,
    animation: "1",
  });
  const [hrs, setHrs] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  //Refs
  const targetRef = useRef(null);
  const animationRef = useRef(null);
  const setAnimationRef = useRef(null);

  //useEffects

  //set target if date is not provided
  useEffect(() => {
    const fun = () => {
      if (!date) {
        setDev(true);
        const safe = input.time.length === 16 ? input.time + ":00" : input.time;
        targetRef.current = new Date(safe);
      }
    };
    fun();
  }, []);

  //set input time
  useEffect(() => {
    const safe = selectTime.length === 16 ? selectTime + ":00" : selectTime;

    setInput((prev) => ({
      ...prev,
      time: safe,
    }));

    targetRef.current = new Date(safe);
  }, [selectTime]);

  //decode date from url
  useEffect(() => {
    if (date) {
      const decoded = decodeURIComponent(date);

      const safe = decoded.length === 16 ? decoded + ":00" : decoded;

      targetRef.current = new Date(safe);
      setDev(false);
    }
  }, [date]);

  //set animation from input
  useEffect(() => {
    if (!dev) return;
    console.log(input.animation);

    setShowAnimation(
      animations.find((a) => a.id === input.animation) || animations[0]
    );
  }, [input.animation]);

  //update target from input in dev
  useEffect(() => {
    if (!date && input.time) {
      targetRef.current = new Date(input.time);
    }
  }, [input.time, date]);

  //update timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!targetRef.current) return;

      const curr = new Date();
      const diff = targetRef.current - curr;

      if (diff <= 0) {
        setHrs("0");
        setMin("0");
        setSec("0");
        if (!dev) setDone(true);

        return;
      }

      const total = Math.floor(diff / 1000);
      const hr = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = Math.floor(total % 60);

      setHrs(hr);
      setMin(m);
      setSec(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [date, input.time, dev]);

  //update theme
  useEffect(() => {
    console.log(input.theme);

    const update = () => {
      const updated = { ...input };
      updated.theme = selectTheme;
      setInput(updated);
    };
    update();
  }, [selectTheme]);

  //scroll function
  const scroll = (item) => {
    item.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  //generating link
  const handleGenerate = () => {
    const convertedTitle = input.title.split(" ").join("-") || "null";
    const convertedMessage = input.message.split(" ").join("-") || "null";
    const encodedTime = encodeURIComponent(input.time);

    const link = `https://imksh-pages.netlify.app/countdown/${encodedTime}/${convertedTitle}/${convertedMessage}/${input.theme}/${input.animation}`;

    navigate(
      `/countdown/${encodedTime}/${convertedTitle}/${convertedMessage}/${input.theme}/${input.animation}`
    );
    copyToClipboard(link);
    setDev(false);
  };

  //copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to Clipboard");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy Link to clipboard");
    }
  };

  return (
    <>
      {dev && (
        <Header
          showInfinity={true}
          heading="Countly"
          name1={width < 500 ? "Set Animation" : "Generate Custom Countdowns"}
          name2={width < 500 ? "View Animation" : ""}
          fun1={width < 500 ? () => scroll(setAnimationRef) : null}
          fun2={() => scroll(animationRef)}
        />
      )}
      <div
        className={`${themeMap[theme || input.theme] || "bg-blue-400"} ${
          dev ? "h-[90dvh] mt-[10dvh]" : "h-dvh"
        } w-screen overflow-x-hidden md:overflow-y-hidden flex flex-col md:flex-row `}
      >
        {dev && (
          <div
            className=" md:w-[50%] lg:min-w-[60%] border-r min-h-[90dvh] flex items-center justify-center"
            ref={setAnimationRef}
          >
            <div className="bg-white px-4 py-8 md:p-12 flex flex-col w-[90%] lg:w-[50%] gap-4 rounded-2xl m-auto ">
              <input
                type="datetime-local"
                className="border p-2"
                value={selectTime}
                onChange={(e) => setSelectTime(e.target.value)}
              />
              <input
                type="text"
                className="px-4 py-2 rounded w-50% border "
                placeholder="Title"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />

              <input
                type="text"
                className="px-4 py-2 rounded w-50% border "
                placeholder="Message"
                value={input.message}
                onChange={(e) =>
                  setInput({ ...input, message: e.target.value })
                }
              />

              <ChooseTheme theme={selectTheme} setTheme={setSelectTheme} />

              <div className="flex overflow-x-scroll gap-4 hide-scrollbar my-4">
                {animations.map((item, key) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={key}
                    className={`w-[30%] flex justify-center h-24 rounded-lg overflow-hidden shrink-0 hide-scrollbar cursor-pointer items-center ${
                      showAnimation.id === item.id
                        ? `bg-${input.theme}-200`
                        : ""
                    }`}
                    onClick={() => setInput({ ...input, animation: item.id })}
                  >
                    <Lottie
                      animationData={item.animation}
                      className="w-20 h-20"
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                onClick={handleGenerate}
              >
                Generate
              </motion.button>
            </div>
          </div>
        )}
        <div
          className={`flex flex-col items-center mx-auto ${
            dev ? "min-h-[90dvh]" : "min-h-dvh"
          }`}
          ref={animationRef}
        >
          <div className="flex items-center gap-1 justify-center py-8 relative">
            <Flip key={`h-${hrs}`} item={hrs < 10 ? `0${hrs}` : hrs} />{" "}
            <p className="text-5xl text-red-500">:</p>
            <Flip key={`m-${min}`} item={min < 10 ? `0${min}` : min} />
            <p className="text-5xl text-red-500">:</p>
            <Flip key={`s-${sec}`} item={sec < 10 ? `0${sec}` : sec} />
            {done && (
              <Lottie animationData={celebrate} loop className="absolute" />
            )}
          </div>
          <div className="flex flex-col items-center justify-center text-white h-full">
            <p className="text-3xl lg:text-5xl font-extrabold text-center">
              {dev
                ? input.title || "Countdown Title"
                : message
                ? title === "null"
                  ? ""
                  : title.split("-").join(" ")
                : ""}
            </p>
            <p clsssName="my-8 text-center">
              {dev
                ? input.message || "Add Message here"
                : message
                ? message === "null"
                  ? ""
                  : message.split("-").join(" ")
                : ""}
            </p>
            <motion.div
              drag
              whileTap={
                showAnimation.id === "1" ? { scale: 2 } : { scale: 0.9 }
              }
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.3}
              animate={showAnimation.id === "1" ? { scale: 2.5 } : {}}
              className="m-auto"
            >
              <Lottie
                animationData={showAnimation.animation}
                className="w-40 h-40 cursor-pointer"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {done && (
        <>
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%]"
          />
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%]"
          />
        </>
      )}
      <Toaster />
    </>
  );
};

export default Countdown;
