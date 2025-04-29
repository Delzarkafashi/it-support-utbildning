import React from "react";
import { Link } from "react-router-dom";
import "./LogSign.css";

const LogSign = () => {
  return (
    <div className="logsign-buttons">
      <Link to="/login" className="btn-login">Logga in</Link>
      <Link to="/register" className="btn-register">Registrera</Link>
    </div>
  );
};

export default LogSign;
