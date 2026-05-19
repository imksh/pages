import { Outlet } from "react-router-dom";
import Header from "../Header";
const PublicLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicLayout;
