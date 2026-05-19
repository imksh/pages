import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Loading from "../Loading";
import { motion } from "motion/react";

const AuthLayout = () => {
  const { user, isChecking } = useAuthStore();

  if (isChecking) return <Loading />;

  if (user) return <Navigate to="/" replace />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <Outlet />
    </motion.div>
  );
};

export default AuthLayout;
