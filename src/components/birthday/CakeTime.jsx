import React from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import Cake from "../../assets/animations/cake.json";
import Lottie from "lottie-react";
import Background from "./Background";

const CakeTime = ({ onContinue }) => {
  return (
    <div className="relative flex min-h-dvh overflow-hidden items-center justify-center bg-[#12071f]  px-6">
      <Background />

      {/* Main Content */}
      <div className="relative z-10 flex w-full h-dvh  max-w-5xl flex-col items-center justify-center text-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 rounded-full bg-pink-500/10 px-5 py-2 text-sm font-medium text-pink-300 backdrop-blur-lg"
        >
          🎂 Birthday Celebration
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-black leading-tight text-white md:text-7xl w-full flex items-center justify-center gap-2 flex-wrap"
        >
          Magical
          <span className="block bg-gradient-to-r from-pink-400 via-rose-300 to-yellow-300 bg-clip-text text-transparent">
            Cake Time ✨
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 md:mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Wishing you happiness, laughter and beautiful memories 💖
        </motion.p>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [-10, 10, -10],
          }}
          transition={{
            opacity: {
              duration: 0.8,
            },
            y: {
              duration: 4,
              repeat: Infinity,
            },
          }}
          className="relative mt-8"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-3xl" />

          {/* Cake Container */}
          <div className="relative rounded-full border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
            <Lottie animationData={Cake} loop className="md:h-[220px] md:w-[220px] w-[180px] h-[180px]" />
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={onContinue}
          className="mt-8 flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-pink-500/30"
        >
          <Gift className="h-5 w-5" />
          Celebrate Now 🎉
        </motion.button>
      </div>
    </div>
  );
};

export default CakeTime;
