import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Flip = ({ item }) => {
  return (
    <div
      className="inline-flex flex-col text-[#de4848] text-5xl relative min-w-20 justify-center rounded-lg overflow-hidden"
      style={{ perspective: 1000 }}  
    >
      <div className="top bg-[#f7f7f7] leading-none p-[0.25em] border-b border-gray-400 h-[0.75em] w-full flex items-start justify-center">
        {item}
      </div>

      <div className="bottom w-full bg-white leading-none p-[0.25em] h-[0.75em] flex items-end justify-center">
        {item}
      </div>

      <AnimatePresence mode="wait">
       
        <motion.div
          key={`top-${item}`}
          className="top bg-orange-50 leading-none p-[0.25em] border-b border-gray-400 h-[0.75em] w-full origin-bottom absolute top-0 left-0 flex items-end justify-center"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          exit={{ rotateX: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item}
        </motion.div>

        {/* Flipping bottom */}
        <motion.div
          key={`bottom-${item}`}
          className="bottom w-full bg-white leading-none p-[0.25em] h-[0.75em] flex items-end justify-center origin-top absolute top-1/2 left-0"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Flip;