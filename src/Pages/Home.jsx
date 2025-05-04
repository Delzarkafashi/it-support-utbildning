import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [team, setTeam] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    

  useEffect(() => {
    fetch('https://localhost:7266/api/Team') 
      .then(response => {
        if (!response.ok) {
          throw new Error("Något gick fel med API-anropet.");
        }
        return response.json();
      })
      .then(data => {
        setTeam(data); 
        setLoading(false);
      })
      .catch(error => {
        setError(error.message); 
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <p>Laddar teamdata...</p>; 
  }

  if (error) {
    return <p>Fel vid hämtning av data: {error}</p>;
  }

  return (
    <div className="home">
      <p className="intro-text">
        Vi är tre bröder som tillsammans driver vårt företag med passion och expertis.
      </p>

      {team.map((member, index) => (
        <div key={index} className={`team-member delay-${index + 1}`}>
          <img src={member.imagePath} alt={member.name} />
          <div>
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p>{member.description}</p> 
            <p>• E-post: {member.email}<br />• Telefon: {member.phone}</p>
          </div>
        </div>
      ))}

      <p className="closing-text">
        Tillsammans strävar vi efter att erbjuda professionella tjänster och lösningar för våra kunder.
      </p>
    </div>
  );
};

export default Home;
