import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LogSign from "./LogSign";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="parent">
      <Header />
      <LogSign />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
