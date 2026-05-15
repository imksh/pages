import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import Background from "./Background";
import ProfileImage from "../../assets/images/avi.webp";

const FinalWish = ({ name = "Bestie", onReplay }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#12071f] px-6 py-8">
      <Background />

      {/* Soft Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-pink-500/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

      {/* Floating Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute text-pink-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 18 + 12}px`,
          }}
        >
          {i % 2 === 0 ? "💖" : "✨"}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        {/* Small Tag */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mb-6 flex items-center gap-2 rounded-full bg-pink-500/10 px-5 py-2 text-pink-300 backdrop-blur-lg"
        >
          <Sparkles className="h-4 w-4" />
          One Last Thing...
        </motion.div>

        {/* Profile Image */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-3xl" />

          <img
            src={ProfileImage}
            alt="Profile"
            className="relative z-10 h-40 w-40 rounded-full border-4 border-pink-400 object-cover shadow-2xl"
            style={{
              clipPath: "circle(50%)",
            }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-10 text-4xl font-black leading-tight text-white md:text-6xl"
        >
          Happy Birthday
          <span className="block bg-gradient-to-r from-pink-400 via-rose-300 to-violet-400 bg-clip-text text-transparent">
            {name} 💖
          </span>
        </motion.h1>

        {/* Emotional Message */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          No matter how many birthdays come and go,
          <br />
          I just hope you always stay happy,
          keep smiling and achieve everything you dream of ✨
          <br />
          <br />
          Thank you for being such a beautiful part of life 💖
        </motion.p>

        {/* Bottom Text */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-10 flex items-center gap-2 text-pink-300"
        >
          <Heart className="h-5 w-5 fill-pink-300" />

          <span className="text-sm tracking-[3px] uppercase">
            Made With Love
          </span>

          <Heart className="h-5 w-5 fill-pink-300" />
        </motion.div>

        {/* Replay Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={onReplay}
          className="mt-12 flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-pink-500/20"
        >
          <RotateCcw className="h-5 w-5" />
          Replay Surprise
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FinalWish;