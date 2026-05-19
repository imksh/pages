import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Loading from "../Loading";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "motion/react";

const ProtectedLayout = () => {
  const { user, isChecking } = useAuthStore();

  if (isChecking) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

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

export default ProtectedLayout;
