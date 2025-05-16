import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizEdit.css';
import { useAuth } from "../context/AuthContext";

const QuizEdit = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchQuizzes = async () => {
      try {
        const url =
          user.access_level === 3
            ? `https://localhost:7266/api/quiz/category/${user.category}`
            : 'https://localhost:7266/api/quiz';

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        });

        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Fel vid hämtning av quiz:', err);
      }
    };

    fetchQuizzes();
  }, [user]);

  const handleQuestionChange = (qIndex, value) => {
    const updated = [...selectedQuiz.questions];
    updated[qIndex].questionText = value;
    setSelectedQuiz({ ...selectedQuiz, questions: updated });
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updated = [...selectedQuiz.questions];
    updated[qIndex].answers[aIndex] = value;
    setSelectedQuiz({ ...selectedQuiz, questions: updated });
  };

  const handleCorrectChange = (qIndex, value) => {
    const updated = [...selectedQuiz.questions];
    updated[qIndex].correctAnswer = value;
    setSelectedQuiz({ ...selectedQuiz, questions: updated });
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        name: selectedQuiz.name,
        category: selectedQuiz.category,
        questions: selectedQuiz.questions.map(q => ({
          questionText: q.questionText,
          answers: q.answers,
          correctAnswer: q.correctAnswer
        }))
      };

      const res = await fetch(`https://localhost:7266/api/quiz/${selectedQuiz.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok || res.status === 204) {
        navigate(`/quizplay/${selectedQuiz.id}`);
      } else {
        alert("Misslyckades med att spara ändringar");
      }
    } catch (err) {
      console.error(err);
      alert("Något gick fel vid sparandet");
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (!window.confirm('Är du säker på att du vill ta bort detta quiz?')) return;

    try {
      const res = await fetch(`https://localhost:7266/api/quiz/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (res.ok) {
        setSelectedQuiz(null);
        const updated = quizzes.filter(q => q.id !== id);
        setQuizzes(updated);
      } else {
        alert('Misslyckades att ta bort quiz.');
      }
    } catch (err) {
      console.error(err);
      alert('Ett fel uppstod vid borttagning.');
    }
  };

  if (user === null) {
    return <p>Laddar...</p>;
  }

  return (
    <div className="quiz-container">
      <h2>Redigera Quiz</h2>

      <div className="quiz-select-buttons">
        {quizzes.map((q) => (
          <div key={q.id} className="quiz-select-group">
            <button onClick={() => setSelectedQuiz({ ...q })} className="quiz-select-btn">
              ✏️ {q.name}
            </button>
            <button onClick={() => handleDeleteQuiz(q.id)} className="quiz-delete-btn">
              🗑️
            </button>
          </div>
        ))}
      </div>

      {selectedQuiz && (
        <div>
          <h3>Redigerar: {selectedQuiz.name}</h3>
          {selectedQuiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <input
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Fråga"
              />

              {q.answers.map((a, aIndex) => (
                <input
                  key={aIndex}
                  value={a}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                  placeholder={`Svar ${aIndex + 1}`}
                />
              ))}

              <input
                value={q.correctAnswer}
                onChange={(e) => handleCorrectChange(qIndex, e.target.value)}
                placeholder="Rätt svar"
                className="correct-answer"
              />
            </div>
          ))}

          <button onClick={handleSaveChanges} className="save-btn">
            💾 Spara ändringar
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizEdit;
