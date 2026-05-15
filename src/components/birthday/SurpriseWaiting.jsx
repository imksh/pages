import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import Background from "./Background";

const SurpriseWaiting = ({ onContinue, name }) => {
  // Generate particles once only
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 3 + i * 0.2,
    }));
  }, []);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#12071f] px-6">
      <Background />
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl"
      >
        {/* Glow Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 to-violet-500/5" />

        {/* Icon */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="relative z-10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 shadow-lg shadow-pink-500/30"
        >
          <Gift className="h-12 w-12 text-white" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-4xl font-black tracking-tight text-white md:text-5xl"
        >
          A Surprise
          <span className="block bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Is Waiting For You {name} ✨
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 mt-6 text-center text-base leading-relaxed text-white/70 md:text-lg"
        >
          Something magical has been prepared just for you. Get ready for an
          unforgettable birthday experience ✨
        </motion.p>

        {/* Sparkles */}
        <div className="relative z-10 mt-8 flex items-center justify-center gap-2 text-pink-300">
          <Sparkles className="h-5 w-5" />

          <span className="text-sm uppercase tracking-widest">
            Tap to begin
          </span>

          <Sparkles className="h-5 w-5" />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={onContinue}
          className="relative z-50 mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300"
        >
          Open Surprise
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </motion.button>

        {/* Bottom Glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-[32px] bg-gradient-to-t from-pink-500/10 to-transparent" />
      </motion.div>
    </div>
  );
};

export default SurpriseWaiting;
