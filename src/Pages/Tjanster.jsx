import { Link } from "react-router-dom";
import "./Tjanster.css";

const Tjanster = () => {
  return (
    <div className="services-wrapper">
      
      <Link to="/bygga-hemsidor" className="service-box left delay-1">
        <div>
          <h3>⭐ Bygga Hemsidor</h3>
          <p>Vi hjälper dig skapa moderna hemsidor från grunden!</p>
        </div>
      </Link>

      <Link to="/agil-scrum" className="service-box right delay-2">
        <div>
          <h3>🤝 Agil/Scrum Stöd</h3>
          <p>Utbildning och coachning i Agil projektmetodik och Scrum.</p>
        </div>
      </Link>

      <Link to="/teamutveckling" className="service-box left delay-3">
        <div>
          <h3>🚀 Teamutveckling</h3>
          <p>Förbättra teamarbete och digitala processer i ditt företag.</p>
        </div>
      </Link>

    </div>
  );
};

export default Tjanster;
