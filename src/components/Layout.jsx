import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="parent">
      <div className="HeaderDiv">
        <Header />
      </div>

      <div className="OutletDiv">
        <Outlet />
      </div>

      <div className="FooterDiv">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
