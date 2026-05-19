import React from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";
import Cake from "../../assets/animations/cake.json";
import Lottie from "lottie-react";
import Background from "./Background";
import { useIsMobile } from "../../hooks/useIsMobile";

const CakeTime = ({ onContinue, data }) => {
  const name = data?.name || "you";
  const isMobile = useIsMobile();

  return (
    <>
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
            className="text-4xl font-black leading-tight text-white md:text-7xl  flex items-center justify-center gap-2 flex-wrap relative w-fit"
          >
            Magical
            <span className="block bg-gradient-to-r from-pink-400 via-rose-300 to-yellow-300 bg-clip-text text-transparent">
              Cake Time ✨
            </span>
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="text-2xl md:text-4xl text-pink-400/80 absolute -bottom-6 -right-2"
            >
              {name}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 md:mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Wishing <span className="font-bold text-xl">{name}</span> happiness,
            laughter and beautiful memories 💖
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
              <Lottie
                animationData={Cake}
                loop
                className="md:h-[220px] md:w-[220px] w-[180px] h-[180px]"
              />
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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {data?.images?.map((item, indx) => {
          const positions = [
            "top-[8%] left-[6%]",
            "top-[12%] right-[8%]",
            "top-[38%] left-[12%]",
            "top-[52%] right-[10%]",
            "bottom-[10%] left-[18%]",
            "bottom-[14%] right-[14%]",
            "top-[22%] left-[42%]",
            "bottom-[24%] right-[40%]",
          ];

          const rotations = [
            "rotate-[-8deg]",
            "rotate-[6deg]",
            "rotate-[-4deg]",
            "rotate-[10deg]",
            "rotate-[-12deg]",
            "rotate-[5deg]",
          ];

          const mobilePositions = [
            // top area
            "top-[2%] left-[2%]",
            "top-[4%] right-[2%]",

            // upper middle sides
            "top-[18%] left-[-2%]",
            "top-[20%] right-[-2%]",

            // center side floating
            "top-[38%] left-[1%]",
            "top-[42%] right-[1%]",

            // lower middle sides
            "bottom-[24%] left-[-1%]",
            "bottom-[22%] right-[-1%]",

            // bottom corners
            "bottom-[4%] left-[3%]",
            "bottom-[6%] right-[3%]",
          ];

          const mobileRotations = [
            "rotate-[-18deg]",
            "rotate-[16deg]",
            "rotate-[-12deg]",
            "rotate-[14deg]",
            "rotate-[-9deg]",
            "rotate-[10deg]",
            "rotate-[-15deg]",
            "rotate-[13deg]",
            "rotate-[-20deg]",
            "rotate-[18deg]",
          ];

          const randomPosition = isMobile ? mobilePositions[indx % mobilePositions.length] : positions[indx % positions.length];

          const randomRotation = isMobile ? mobileRotations[indx % mobileRotations.length] : rotations[indx % rotations.length];

          return (
            <div
              key={indx}
              className={`absolute ${randomPosition} ${randomRotation} w-40 h-40 md:h-56 md:w-56 transition duration-700 hover:scale-105`}
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-amber-300/30 blur-2xl" />

              {/* frame */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-300 p-[5px] shadow-[0_20px_80px_rgba(236,72,153,0.25)]">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950">
                  {/* overlay */}
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_40%)]" />

                  {/* image */}
                  <img
                    src={item.url}
                    alt={data.name}
                    className="h-full w-full object-cover"
                  />

                  {/* badge */}
                  <div className="absolute bottom-3 left-3 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-pink-200">
                      Memory
                    </p>
                  </div>
                </div>
              </div>

              {/* floating icons */}
              <div className="absolute -right-3 top-3 rounded-2xl bg-pink-400 p-2 shadow-xl shadow-pink-500/30">
                <Heart className="h-4 w-4 text-white" />
              </div>

              <div className="absolute -left-3 bottom-4 rounded-2xl bg-amber-300 p-2 shadow-xl shadow-amber-400/30">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CakeTime;
