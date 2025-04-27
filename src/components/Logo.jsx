import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src="/assets/logo.png" alt="IT Support & Utbildning"/>
      </Link>
    </div>
  );
};
export default Logo;
