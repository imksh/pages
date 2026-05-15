import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const BirthdayLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default BirthdayLayout;
