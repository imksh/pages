import React, { useState } from "react";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useUiStore from "../store/useUiStore";

const Header = ({
  showInfinity,
  heading,
  name1,
  name2,
  name3,
  name4,
  fun1,
  fun2,
  fun3,
  fun4,
  color,
  showUser,
}) => {
  const { user } = useAuthStore();
  const { showHeader, setShowHeader } = useUiStore();
  const navigate = useNavigate();
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return `${parts[0][0]} ${parts[1][0]}`.toUpperCase();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full z-99 ${
        color ? color : "bg-blue-600"
      } ${
        showHeader ? "rounded-b-2xl" : ""
      } text-white flex flex-col px-4 md:px-16 min-h-[10dvh] justify-center`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`flex  justify-between  items-center h-[10dvh] z-99 ${
          color ? color : "bg-blue-600"
        }`}
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={fun1 ? fun1 : null}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          {showInfinity && (
            <Lottie
              animationData={infinity}
              loop
              autoplay
              className="w-10 h-10 md:w-12 md:h-12"
            />
          )}
          <p className="text-xl md:text-2xl font-bold ">{heading}</p>
        </motion.button>

        <div className="hidden md:flex list-none gap-3 items-center  my-auto">
          {name1 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              onClick={fun1 ? fun1 : null}
              className="cursor-pointer"
            >
              {name1}
            </motion.button>
          )}
          {name2 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              onClick={fun2}
              className="cursor-pointer"
            >
              {name2}
            </motion.button>
          )}
          {name3 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              onClick={fun3}
              className="cursor-pointer"
            >
              {name3}
            </motion.button>
          )}
          {name4 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              onClick={fun4}
              className="cursor-pointer"
            >
              {name4}
            </motion.button>
          )}

          {showUser && user && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/profile")}
              className={`text-white border bg-blue-400 rounded-full p-2 min-w-10 aspect-square text-center cursor-pointer ${
                location === "/profile" ? "border-white" : "border-(--primary) "
              }`}
            >
              {getInitials(user?.name)}
            </motion.button>
          )}
        </div>
        {fun1 && (
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowHeader(!showHeader);
              }}
            >
              {showHeader ? (
                <IoCloseSharp size={30} />
              ) : (
                <GiHamburgerMenu size={24} />
              )}
            </motion.button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showHeader && (
          <motion.div
            className="flex  md:hidden flex-col items-baseline gap-3 mx-4 mb-4"
            exit={{ opacity: 0, y: -100 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {fun1 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  fun1();
                  setShowHeader(false);
                }}
                className="cursor-pointer w-full flex justify-baseline"
              >
                {name1}
              </motion.button>
            )}
            {fun2 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  fun2();
                  setShowHeader(false);
                }}
                className="cursor-pointer w-full flex justify-baseline"
              >
                {name2}
              </motion.button>
            )}
            {fun3 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  fun3();
                  setShowHeader(false);
                }}
                className="cursor-pointer w-full flex justify-baseline"
              >
                {name3}
              </motion.button>
            )}
            {fun4 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  fun4();
                  setShowHeader(false);
                }}
                className="cursor-pointer w-full flex justify-baseline"
              >
                {name4}
              </motion.button>
            )}
            {showUser && user && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  navigate("/profile");
                  setShowHeader(false);
                }}
                className={`text-white border bg-blue-400 rounded-full p-2 min-w-10 aspect-square text-center cursor-pointer  ${
                  location === "/profile"
                    ? "border-white"
                    : "border-(--primary) "
                }`}
              >
                {getInitials(user?.name)}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
