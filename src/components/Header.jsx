import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogSign from "./LogSign";
import "./Header.css";
import Logo from "./Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Logo />
      </div>
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
        <LogSign />
      </div>
    </div>
  );
};

export default Header;
