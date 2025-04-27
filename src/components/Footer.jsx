import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="fotter">
      <div className="fotter-del1">
        <h4>Navigationslänkar</h4>
        <ul>
          <li><a href="/">Hem</a></li>
          <li><a href="/om-oss">Om oss</a></li>
          <li><a href="/tjanster">Tjänster</a></li>
          <li><a href="/kontakt">Kontakt</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>

      <div className="fotter-del2">
        <h4>Företagsinformation</h4>
        <p>Företagsnamn: ITUtbildningKonsultAB Kafashi</p>
        <p>Adress: Din företagsadress</p>
        <p>Telefon: Kontakttelefonnummer</p>
        <p>E-post: kontakt@dittforetag.se</p>
        <p>Organisationsnummer: (om det behövs)</p>
      </div>

      <div className="fotter-del3">
        <h4>Juridisk information</h4>
        <ul>
          <li><a href="/integritetspolicy">Integritetspolicy</a></li>
          <li><a href="/anvandarvillkor">Användarvillkor</a></li>
          <li><a href="/cookies">Cookies</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
