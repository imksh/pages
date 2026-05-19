import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

const HomeCard = ({ item, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Parse tech stack
  const techs = item.tech
    ? item.tech
        .split(",")
        .map((t) => t.trim())
        .slice(0, 2)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -12 }}
      className="h-full"
    >
      <motion.button
        onClick={() => navigate(item.link)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
        whileTap={{ scale: 0.96 }}
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-100">
          <motion.img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-5 md:p-6">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-left mb-3 line-clamp-2">
            {item.title}
          </h3>

          {/* Tech Stack Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {techs.map((tech) => (
              <motion.span
                key={tech}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 rounded-full border border-blue-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 text-left flex-grow mb-4 line-clamp-3 leading-relaxed">
            {item.desc}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-3" />

          {/* Footer Button */}
          <motion.button
            onClick={() => navigate(item.link)}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group/btn"
          >
            <span className="text-sm font-semibold text-blue-600 group-hover/btn:text-blue-700">
              Explore
            </span>
            <motion.div
              animate={
                isHovered ? { x: 6, opacity: 1 } : { x: 0, opacity: 0.7 }
              }
              transition={{ duration: 0.2 }}
            >
              <MdArrowForward className="text-lg text-blue-600" />
            </motion.div>
          </motion.button>
        </div>

        {/* Subtle Background Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/8 pointer-events-none transition-all duration-300" />

        {/* Border Glow Effect */}
        <div className="absolute -inset-px bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur" />
      </motion.button>
    </motion.div>
  );
};

export default HomeCard;
