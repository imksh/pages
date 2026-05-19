import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import celebrate from "../assets/animations/celebrate.json";
import Pookie from "../assets/animations/pookie.json";
import Lottie from "lottie-react";
import useAuthStore from "../store/useAuthStore";
import Login from "./Login";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import trophy from "../assets/animations/trophy.json";
import useWindowSize from "../hooks/useWindowSize";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const emojiData = [
  { id: 1, emoji: "😎" },
  { id: 2, emoji: "😎" },

  { id: 3, emoji: "😈" },
  { id: 4, emoji: "😈" },

  { id: 5, emoji: "😜" },
  { id: 6, emoji: "😜" },

  { id: 7, emoji: "😂" },
  { id: 8, emoji: "😂" },

  { id: 9, emoji: "😔" },
  { id: 10, emoji: "😔" },

  { id: 11, emoji: "😁" },
  { id: 12, emoji: "😁" },

  { id: 13, emoji: "💀" },
  { id: 14, emoji: "💀" },

  { id: 15, emoji: "🙄" },
  { id: 16, emoji: "🙄" },

  { id: 17, emoji: "🥳" },
  { id: 18, emoji: "🥳" },

  { id: 19, emoji: "😭" },
  { id: 20, emoji: "😭" },
];

const MatchGrid = () => {
  const { user, logout } = useAuthStore();
  const [data, setData] = useState([]);
  const [prev, setPrev] = useState({});
  const [found, setFound] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [show, setShow] = useState(false);
  const [curr, setCurr] = useState({});
  const [winner, setWinner] = useState(false);
  const [login, setLogin] = useState();
  const [gameStat, setGameStat] = useState({});
  const [start, setStart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [loading, setLoading] = useState(false);
  const size = useWindowSize();
  const [showRem, setShowRem] = useState(3);
  const [matched, setMatched] = useState("");

  const logic = (item) => {
    if (loading) return;
    if (!prev.id) {
      setPrev(item);
      return;
    }
    if (item.id === prev.id) return;
    setLoading(true);

    if (item.emoji === prev.emoji) {
      const updated = [...found, item.id, prev.id];
      if (updated.length === emojiData.length) {
        setWinner(true);
        stopTimer();
        handleSubmit();
      }
      setFound(updated);
      setMatched(item.emoji);
      setTimeout(() => {
        setMatched("");
      }, 2000);
    }
    setTimeout(() => {
      setPrev({});
      setCurr({});
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = async () => {
    try {
      if (!user) return;
      const res = await api.post("/pages/games/match-grid", {
        games: gameStat.games + 1,
        bestMove:
          gameStat.bestMove === 0
            ? moves
            : Math.min(gameStat.bestMove, moves + 1),
        bestTime:
          gameStat.bestTime === 0 ? time : Math.min(gameStat.bestTime, time),
      });
      setGameStat(res.data);
    } catch (error) {
      console.log("Error in submitting score: ", error);
    }
  };

  const showAll = () => {
    if (show) return;
    if (showRem <= 0) {
      toast.error("Show limit exhausted");
      return;
    }
    setShowRem((p) => p - 1);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setData(shuffle(emojiData));
  };

  const shuffle = (array) => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!user) return;
        const res = await api.get("/pages/games/match-grid");
        setGameStat(res.data);
      } catch (error) {
        console.log("Error in getting score: ", error);
      }
    };
    fetch();
  }, [user]);

  const handleStart = () => {
    setFound([]);
    setCurr({});
    setPrev({});
    setWinner(false);
    setShow(false);
    setTime(0);
    stopTimer();
    setMoves(0);
    setShowRem(3);
    if (!start) {
      startTimer();
    }
    setStart(!start);
  };

  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden relative">
      <div className=" p-4 sm:px-12 flex items-center justify-between shadow bg-blue-500 h-[10dvh] z-99 relative">
        <div>
          <h2 className="text-white text-xl sm:text-3xl font-bold">
            MatchGrid
          </h2>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 1 }}
          className="absolute left-[50%] -translate-x-[50%] text-3xl"
        >
          {matched}
        </motion.div>
        {user ? (
          <div
            className="flex gap-4 items-center  sm:p-4 ml-auto text-white cursor-pointer"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
            onClick={() =>
              size.width < 645
                ? setShowProfile((p) => !p)
                : navigate("/profile")
            }
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              src="/images/avtar.png"
              alt=""
              className=" w-10 h-10 sm:w-12 sm:h-12 object-contain p-1 sm:p-2.5 bg-blue-300 rounded-full border-2 sm:border-3 border-white"
            />
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-[12px] text-slate-200">{user.email}</p>
            </div>
          </div>
        ) : (
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-6 py-2 min-w-30 rounded text-white cursor-pointer bg-green-500 hover:bg-green-700 `}
              onClick={() => setLogin(true)}
            >
              Login
            </motion.button>
          </div>
        )}
      </div>

      <div className="grid  grid-cols-2 gap-4 md:gap-0  md:flex  w-full md:justify-around items-center p-4  z-99">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`px-6 py-2 min-w-30 rounded text-white cursor-pointer ${start ? "bg-red-500 hover:bg-red-700 " : "bg-green-500 hover:bg-green-700 "}`}
          onClick={handleStart}
        >
          {!start ? "Start" : "Restart"}
        </motion.button>
        <div className="order-3 sm:order-2 col-span-2 justify-center flex gap-8">
          <div className="bg-slate-500 px-4 py-2 rounded-2xl text-center text-white min-w-24">
            <p>Moves</p>
            <p>{moves || 0}</p>
          </div>
          <div className="bg-slate-500 px-4 py-2 rounded-2xl text-center text-white min-w-24">
            <p>Time</p>
            <p>{time || 0}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="order-2 sm:order-3 px-6 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={showAll}
          disabled={!start}
        >
          Show {showRem}
        </motion.button>
      </div>

      <div className="grid grid-cols-4 m-auto gap-1 w-fit relative ">
        {!start && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStart}
            className="absolute z-20 w-full flex p-8 justify-center items-center top-[50%] -translate-y-[50%] bg-blue-400 text-white cursor-pointer text-xl font-bold rounded-lg"
          >
            {" "}
            Start Game
          </motion.button>
        )}
        {data?.map((item, indx) => {
          return (
            <motion.button
              animate={show || winner ? { y: [0, 5, 0, -5, 0] } : { y: 0 }}
              transition={show || winner ? { repeat: Infinity } : { repeat: 0 }}
              className={` relative border rounded border-slate-300 w-16 sm:w-20 aspect-square text-4xl cursor-pointer  `}
              style={{ perspective: 1000 }}
              key={indx}
              onClick={() => {
                setMoves((p) => (prev.id === item.id ? p : p + 1));
                setCurr(item);
                logic(item);
              }}
              disabled={found.includes(item.id) || !start || loading}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY:
                    curr.id === item.id ||
                    prev.id === item.id ||
                    found.includes(item.id) ||
                    show
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 bg-gray-400"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />

                <div
                  className="absolute inset-0 flex items-center justify-center text-4xl bg-white"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {item.emoji}
                </div>
              </motion.div>

              {found.includes(item.id) && (
                <Lottie
                  animationData={celebrate}
                  className="absolute w-20 inset-0"
                  loop={false}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={showProfile ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onMouseEnter={() => setShowProfile(true)}
        onMouseLeave={() => setShowProfile(false)}
        className="w-[60%] sm:w-[30%] md:w-[20%] h-[90dvh] bg-blue-400 absolute right-0 bottom-0 py-8 flex flex-col gap-4 z-99 overflow-x-hidden"
      >
        <div
          className="flex gap-4 items-center flex-col justify-center text-center  sm:p-4 mx-auto text-white cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            src="/images/avtar.png"
            alt=""
            className=" w-10 h-10 sm:w-12 sm:h-12 object-contain p-1 sm:p-2.5 bg-blue-300 rounded-full border-2 sm:border-3 border-white"
          />
          <div className="">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-[12px] text-slate-200">{user?.email}</p>
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-white">
          MatchGrid Stats
        </h2>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-500/30 text-white w-[80%] mx-auto rounded-2xl flex flex-col items-center justify-center gap-2 p-4 text-xl font-bold"
        >
          <p>Games</p>
          <p>{gameStat.games || 0}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-500/30 text-white w-[80%] mx-auto rounded-2xl flex flex-col items-center justify-center gap-2 p-4 text-xl font-bold"
        >
          <p>Best Time</p>
          <p>{gameStat.bestTime || 0} Sec</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-500/30 text-white w-[80%] mx-auto rounded-2xl flex flex-col items-center justify-center gap-2 p-4 text-xl font-bold"
        >
          <p>Best Move</p>
          <p>{gameStat.bestMove || 0}</p>
        </motion.div>
      </motion.div>

      {winner && (
        <div className="absolute inset-0 flex justify-center items-center overflow-x-hidden">
          <motion.div whileTap={{ scale: 1.1 }} whileHover={{ scale: 0.9 }}>
            <Lottie animationData={trophy} className="w-150" />
          </motion.div>
        </div>
      )}
      {!user && login && (
        <div className="absolute inset-0 z-199 bg-white">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="order-2 sm:order-3 px-6 py-2 bg-red-500 hover:bg-red-700 rounded text-white cursor-pointer absolute top-5 right-5"
            onClick={() => setLogin(false)}
          >
            Close
          </motion.button>
          <Login />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default MatchGrid;
