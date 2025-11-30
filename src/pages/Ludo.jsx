import { useState, useRef, useEffect } from "react";
import { makeSnakeBoard } from "../utils/makeSnakeBoard.js";
import Lottie from "lottie-react";

import celebrate from "../assets/animations/celebrate.json";

const Ludo = () => {
  const cells = makeSnakeBoard();
  const [dice1, setDice1] = useState(6);
  const [dice2, setDice2] = useState(6);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [chance, setChance] = useState(1);
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [six, setSix] = useState(0);
  const diceSound = useRef(new Audio("/sounds/dice.mp3"));
  const snakeSound = useRef(new Audio("/sounds/snake.mp3"));
  const successSound = useRef(new Audio("/sounds/success.mp3"));
  const moveSound = useRef(new Audio("/sounds/button.mp3"));

  const dice1Ref = useRef(null);
  const dice2Ref = useRef(null);
  const rotate = (dice) => {
    dice.current.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 500,
        easing: "ease-in-out",
      }
    );
  };
  function generate() {
    return Math.floor(Math.random() * 6) + 1;
  }
  const player1 = () => {
    rotate(dice1Ref);
    diceSound.current.play();
    if (six === 3) {
      setChance(2);
      setSix(0);
      return;
    }
    const n = generate();

    setDice1(n);
    for (let i = 1; i <= n; i++) {
      if (p1 === 100) break;
      setTimeout(() => {
        setP1((prev) => prev + 1);
        if (i === n) {
          setTimeout(() => {
            jump(p1 + n, setP1);
          }, 100);
        }
      }, i * 300);
    }

    if (p1 + n >= 100) {
      setWinner(player1Name);
      setGameStarted(false);
      setP1(100);
    }
    if (n !== 6) {
      setChance(2);
      setSix(0);
    } else {
      setSix(six + 1);
    }
  };
  const player2 = () => {
    rotate(dice2Ref);
    diceSound.current.play();
    if (six === 3) {
      setChance(1);
      setSix(0);
      return;
    }
    const n = generate();

    setDice2(n);
    for (let i = 1; i <= n; i++) {
      if (p2 === 100) break;
      setTimeout(() => {
        setP2((prev) => prev + 1);
        if (i === n) {
          setTimeout(() => {
            jump(p2 + n, setP2);
          }, 100);
        }
      }, i * 300);
    }
    setDice2(n);
    if (p2 + n >= 100) {
      setWinner(player2Name);
      setP2(100);
      setGameStarted(false);
    }
    if (n !== 6) {
      setChance(1);
      setSix(0);
    } else {
      setSix(six + 1);
    }
  };

  const restart = () => {
    setGameStarted(false);
    setP1(1);
    setP2(1);
    setDice1(6);
    setDice2(6);
    setWinner("");
    setChance(1);
  };

  const jump = (n, fun) => {
    switch (n) {
      case 61:
        successSound.current.play();
        fun(82);
        break;
      case 16:
        successSound.current.play();
        fun(46);
        break;
      case 28:
        successSound.current.play();
        fun(74);
        break;
      case 69:
        successSound.current.play();
        fun(91);
        break;
      case 37:
        successSound.current.play();
        fun(59);
        break;
      case 99:
        snakeSound.current.play();
        setTimeout(() => {
          snakeSound.current.pause();
        }, 1000);
        fun(77);
        break;
      case 62:
        fun(45);
        snakeSound.current.play();
        setTimeout(() => {
          snakeSound.current.pause();
        }, 1000);
        break;

      default:
        break;
    }
  };
  return (
    <div className="container min-h-screen min-w-screen flex flex-col justify-center items-center gradient1 overflow-hidden">
      <div className="nav z-99 py-4 px-2 lg:px-10 bg-blue-800 fixed top-0 w-full text-white flex justify-between items-center">
        <h1 className="text-2xl">Snake & Ladder</h1>
        <div className="flex gap-2 lg:gap-8 items-center justify-center">
          <button
            className={`px-5 py-1  rounded text-white cursor-pointer ${
              gameStarted ? "bg-gray-400" : "bg-green-500"
            }`}
            onClick={() => setGameStarted(true)}
            disabled={gameStarted}
          >
            Start
          </button>
          <button
            className={`px-5 py-1  rounded text-white cursor-pointer ${
              gameStarted ? " bg-red-500" : "bg-gray-400"
            }`}
            onClick={restart}
            disabled={!gameStarted}
          >
            Restart
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row min-w-screen justify-center items-center mt-15">
        {winner && (
          <div className="absolute bg-green-600 text-white w-[50vw] h-[50vh]  rounded-2xl flex justify-center gap-8 items-center flex-col z-50">
            <h1 className="text-4xl bold">{winner} is Winner</h1>
            <button
              className={`px-5 py-1  rounded text-white cursor-pointer z-50 bg-red-500`}
              onClick={restart}
            >
              Restart
            </button>
            <div className="absolute">
              <Lottie animationData={celebrate} loop={true} />
            </div>
          </div>
        )}
        <div className="player1 flex-1 hidden lg:flex justify-center items-center">
          <div className="flex flex-col shadow  justify-center items-center rounded-2xl w-[80%] gap-3 p-5">
            <input
              type="text"
              onChange={(e) => {
                setPlayer1Name(e.target.value);
              }}
              className="text-2xl border-0 text-center"
              value={player1Name}
            />
            <img
              src={`/images/ludo/${dice1}.png`}
              alt="dice"
              width="120px"
              height="120px"
              className="object-cover"
              ref={dice1Ref}
            />
            <button
              className={`px-5 py-2 mt-4 rounded text-white cursor-pointer ${
                !gameStarted || chance !== 1 ? "bg-gray-400" : " bg-blue-600"
              }`}
              onClick={player1}
              disabled={!gameStarted || chance === 2}
            >
              Roll Dice
            </button>
          </div>
        </div>
        <div className="game grid grid-cols-10 w-fit border-3 relative">
          <img
            src="/images/ludo/ladder.png"
            alt="ladder"
            className="absolute z-20 w-16 top-13 lg:w-30 lg:top-23"
          />
          <img
            src="/images/ludo/ladder.png"
            alt="ladder"
            className="absolute z-20 w-20 h-23 top-46 left-31 lg:w-30 lg:h-48 lg:top-77 lg:left-58"
          />
          <img
            src="/images/ludo/ladder.png"
            alt="ladder"
            className="absolute z-20 w-20 h-42 top-21 left-46 lg:w-30 lg:h-75 lg:top-35 lg:left-82 rotate-x-180 rotate-180"
          />

          <img
            src="/images/ludo/ladder.png"
            alt="ladder"
            className="absolute z-20 w-20 h-23 top-5 -right-2 lg:w-30 lg:h-45 lg:top-10 lg:right-0"
          />

          <img
            src="/images/ludo/ladder.png"
            alt="ladder"
            className="absolute z-20 w-24 h-21 top-35 left-7 lg:w-33 lg:h-40 lg:top-59 lg:left-18 rotate-x-180 rotate-180 rotate-z-12"
          />

          <img
            src="/images/ludo/snake.png"
            alt="snake"
            className="absolute z-30 w-23 top-3 left-8 lg:w-30 lg:top-8 lg:left-17"
          />

          <img
            src="/images/ludo/snake.png"
            alt="snake"
            className="absolute z-30 h-20 top-28 left-10 lg:h-35 lg:top-48 lg:left-20"
          />
          {cells.map((n) => (
            <>
              <div
                key={n}
                className="w-8 h-8 lg:w-14 lg:h-14 border border-black relative flex justify-center items-center gap-2"
              >
                <div
                  className={`z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${
                    (p1 === n || p2 === n) && p1 !== p2 ? "text-white" : ""
                  }`}
                >
                  {n}
                </div>
                {p1 === n && (
                  <div
                    className={`${
                      p1 === p2
                        ? "w-3 h-3 lg:w-5 lg:h-5"
                        : "w-5 h-5 lg:w-7 lg:h-7"
                    } bg-red-500 rounded-full`}
                  ></div>
                )}
                {p2 === n && (
                  <div
                    className={`${
                      p1 === p2
                        ? "w-3 h-3 lg:w-5 lg:h-5"
                        : "w-5 h-5 lg:w-7 lg:h-7"
                    } bg-green-500 rounded-full`}
                  ></div>
                )}
              </div>
            </>
          ))}
        </div>
        <div className="player1 flex-1 hidden lg:flex justify-center items-center">
          <div className="flex flex-col shadow  justify-center items-center rounded-2xl w-[80%] gap-3 p-5">
            <input
              type="text"
              onChange={(e) => {
                setPlayer2Name(e.target.value);
              }}
              value={player2Name}
              className="text-2xl border-0 text-center"
            />
            <img
              src={`/images/ludo/${dice2}.png`}
              alt="dice"
              width="120px"
              height="120px"
              className="object-cover"
              ref={dice2Ref}
            />
            <button
              className={`px-5 py-2 mt-4 rounded text-white cursor-pointer ${
                !gameStarted || chance !== 2 ? "bg-gray-400" : " bg-blue-600"
              }`}
              id="btn1"
              onClick={player2}
              disabled={!gameStarted || chance === 1}
            >
              Roll Dice
            </button>
          </div>
        </div>

        <div className="small flex lg:hidden justify-around items-center my-5">
          <div className="flex flex-col shadow  justify-center items-center rounded-2xl w-[40%] gap-3 px-5 py-4">
            <input
              type="text"
              onChange={(e) => {
                setPlayer1Name(e.target.value);
              }}
              value={player1Name}
              className="text-2xl border-0 text-center max-w-[120px]"
            />
            <img
              src={`/images/ludo/${dice1}.png`}
              alt="dice"
              width="40px"
              height="40px"
              className="object-cover"
              ref={dice1Ref}
            />
            <button
              className={`px-3 py-2 mt-4 rounded text-white cursor-pointer ${
                !gameStarted || chance !== 1 ? "bg-gray-400" : " bg-blue-600"
              }`}
              id="btn1"
              onClick={player1}
              disabled={!gameStarted || chance === 2}
            >
              Roll Dice
            </button>
          </div>
          <div className="flex flex-col shadow  justify-center items-center rounded-2xl w-[40%] gap-3 px-5 py-4">
            <input
              type="text"
              onChange={(e) => {
                setPlayer2Name(e.target.value);
              }}
              value={player2Name}
              className="text-2xl border-0 text-center  max-w-[120px]"
            />
            <img
              src={`/images/ludo/${dice2}.png`}
              alt="dice"
              width="40px"
              height="40px"
              className="object-cover"
              ref={dice2Ref}
            />
            <button
              className={`px-3 py-2 mt-4 rounded text-white cursor-pointer ${
                !gameStarted || chance !== 2 ? "bg-gray-400" : " bg-blue-600"
              }`}
              id="btn1"
              onClick={player2}
              disabled={!gameStarted || chance === 1}
            >
              Roll Dice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ludo;
