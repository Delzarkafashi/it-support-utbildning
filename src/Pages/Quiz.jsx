import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import { useAuth } from '../context/AuthContext'; // ✅ Importera context

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Hämta inloggad användare

  const accessLevel = parseInt(user?.access_level, 10);

  const handlePlayClick = () => {
    if (accessLevel === 3) {
      // User → Skicka med kategori till quizplay
      navigate(`/quizplay?category=${user?.category}`);
    } else {
      // Admin / Lärare → Spela alla
      navigate('/quizplay');
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h1>Välkommen till Quiz!</h1>

        <div className="quiz-buttons">
          {/* ✅ Endast admin/lärare ser skapa/redigera */}
          {accessLevel !== 3 && (
            <>
              <button onClick={() => navigate('/quizmaker')} className="quiz-button">
                ➕ Skapa Quiz
              </button>
              <button onClick={() => navigate('/quizedit')} className="quiz-button">
                ✏️ Redigera Quiz
              </button>
            </>
          )}

          {/* ✅ Alla får spela */}
          <button onClick={handlePlayClick} className="quiz-button">
            ▶️ Spela Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
