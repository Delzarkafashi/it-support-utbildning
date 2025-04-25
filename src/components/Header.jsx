import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
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
    </>
  );
};

export default Header;
