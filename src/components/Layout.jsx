import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="parent">
      <div className="header">Header</div>
      <div className="loga">Logo / Namn</div>
      <div className="sok">Sökfält</div>

      <div className="menu">
        <nav>
          <Link to="/">Hem</Link> |{" "}
          <Link to="/tjanster">Tjänster</Link> |{" "}
          <Link to="/kurser">Kurser</Link> |{" "}
          <Link to="/kontakt">Kontakt</Link> |{" "}
          <Link to="/quiz">Quiz</Link>
        </nav>
      </div>

      <div className="logsign">
        <Link to="/login">Logga in</Link> | <Link to="/register">Registrera</Link>
      </div>

      <div className="body">
        <Outlet /> {/* ← Här visas dina pages */}
      </div>

      <div className="fotter">
        <div className="fotter-del1">Navigationslänkar</div>
        <div className="fotter-del2">Företagsinfo</div>
        <div className="fotter-del3">Juridisk info</div>
      </div>
    </div>
  );
};

export default Layout;
