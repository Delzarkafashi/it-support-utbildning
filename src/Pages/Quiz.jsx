import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import { useAuth } from '../context/AuthContext';

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const accessLevel = parseInt(user?.access_level, 10);

  const handlePlayClick = () => {
    if (accessLevel === 3) {
      navigate(`/quizplay?category=${user?.category}`);
    } else {
      navigate('/quizplay');
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h1>Välkommen till Quiz!</h1>

        <div className="quiz-buttons">
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
          {accessLevel === 1 && (
            <button onClick={() => navigate('/admin/categories')} className="quiz-button">
              🛠️ Hantera Kategorier
            </button>
          )}

          <button onClick={handlePlayClick} className="quiz-button">
            ▶️ Spela Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
