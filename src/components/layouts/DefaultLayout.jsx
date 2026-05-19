import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "motion/react";

const DefaultLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen"
    >
      <main className="flex-grow">
        <Outlet />
      </main>
    </motion.div>
  );
};

export default DefaultLayout;
