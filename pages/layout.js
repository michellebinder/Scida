import React from "react";
import {Outlet} from "react-router-dom";
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