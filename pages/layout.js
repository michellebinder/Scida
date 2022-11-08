import React from "react";
import Login from "../pages/login";

const Layout = () => {
  return (
    <>
      <Login />
      <Outlet />
    </>
  );
};

export default Layout;