import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Heart, Gift, Cake, PartyPopper } from "lucide-react";
import Background from "./Background";
import ProfileImage from "../../assets/images/avi.webp";
import toast from "react-hot-toast";

const BirthdayCardFlip = ({ onContinue, name, sender }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Card Ref
  const cardRef = useRef(null);

  // Rotation Motion Values (don't trigger re-renders)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Mouse Interaction
  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newRotateY = ((x - centerX) / centerX) * 12;
    const newRotateX = -((y - centerY) / centerY) * 12;

    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };

  // Reset Rotation
  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 ">
      <Background />

      {/* Decorative Stars */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-10 top-28 text-[120px] text-yellow-300/80"
      >
        ⭐
      </motion.div>

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute right-10 bottom-28 text-[120px] text-yellow-300/80"
      >
        ⭐
      </motion.div>

      {/* Card Container */}
      <div
        ref={cardRef}
        className="relative z-20 h-[520px] w-[340px] cursor-pointer perspective-[2000px]"
        // onClick={() => setIsOpen(!isOpen)}
        // onMouseMove={handleMouseMove}
        // onMouseLeave={resetRotation}
      >
        {/* Card */}
        <motion.div
          animate={{
            rotateY: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="relative h-full w-full preserve-3d"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotateX,
            rotateY: rotateY,
          }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[28px] border border-pink-300/20 bg-gradient-to-b from-pink-100 to-pink-200 shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
            }}
            onClick={() => {
              setIsOpen(true);
            }}
            // onMouseMove={handleMouseMove}
            // onMouseLeave={() => {
            //   if (hasInteracted) {
            //     resetRotation();
            //   }
            // }}
          >
            {/* Shine */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                transform: "skewX(-20deg)",
              }}
            />

            {/* Confetti */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2 + i * 0.1,
                  repeat: Infinity,
                }}
                className="absolute h-3 w-3 rounded-full"
                style={{
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                  background: ["#ff4d6d", "#ffd60a", "#7b2cbf", "#00f5d4"][
                    i % 4
                  ],
                }}
              />
            ))}

            {/* Front Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="mb-6 rounded-full bg-pink-500/10 p-5"
              >
                <Gift className="h-12 w-12 text-pink-500" />
              </motion.div>

              <h1 className="text-4xl font-black uppercase tracking-wider text-pink-600">
                Happy
              </h1>

              <motion.h2
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(236,72,153,0.8)",
                    "0 0 5px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-2 text-5xl font-black text-pink-400"
              >
                BIRTHDAY
              </motion.h2>

              <p className="mt-4 text-xl text-pink-700">to you !</p>

              {/* Cake Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-10 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 p-5 shadow-lg"
              >
                <Cake className="h-12 w-12 text-white" />
              </motion.div>

              <p className="mt-10 text-sm font-medium uppercase tracking-[4px] text-pink-500">
                Tap To Open
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[28px] border border-pink-300/20 bg-gradient-to-b from-pink-100 to-pink-200 shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Shine */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                transform: "skewX(-20deg)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center p-6 text-center">
              {/* Profile */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  clipPath: "circle(50%)",
                }}
              >
                <img
                  src={ProfileImage}
                  alt=""
                  className="h-24 w-24  rounded-full border-4 border-pink-400 shadow-lg object-center object-cover"
                />
              </motion.div>

              <h2 className="mt-4 text-2xl font-black text-pink-500">HAPPY</h2>

              <h1 className="text-3xl font-black text-pink-400">BIRTHDAY</h1>

              {/* <p className="mt-2 text-lg text-pink-700">to you !</p> */}

              {/* Message */}
              <div className="mt-4 rounded-2xl bg-white/40 p-5 text-left shadow-inner backdrop-blur-lg">
                <p className="text-sm leading-relaxed text-pink-900">
                  Dear {name || "Friend"} ❤️
                  <br />
                  <br />
                  Happy Birthday 🎉
                  <br />
                  I hope your day is filled with endless joy, happiness,
                  laughter and unforgettable memories.
                  <br />
                  <br />
                  Keep smiling and keep shining like always ✨
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center gap-2 text-pink-500">
                <Heart className="h-5 w-5 fill-pink-500" />

                <span className="font-semibold">
                  With Love • {sender || "Your Friend"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onContinue?.();
        }}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-xl absolute bottom-8 md:bottom-[80%] md:right-10"
      >
        <PartyPopper className="h-5 w-5" />
        Continue
      </motion.button>
    </div>
  );
};

export default BirthdayCardFlip;
