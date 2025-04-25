import React from "react";
import { Link } from "react-router-dom";
import "./LogSign.css";

const LogSign = () => {
  return (
    <div className="logsign">
      <Link to="/login">Logga in</Link> |{" "}
      <Link to="/register">Registrera</Link>
    </div>
  );
};

export default LogSign;
