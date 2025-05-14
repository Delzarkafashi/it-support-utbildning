import React, { useEffect, useState } from 'react';
import './QuizPlay.css';
import { useAuth } from "../context/AuthContext";

const QuizPlay = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchQuizzes = async () => {
      try {
        const url =
          user.access_level === 3
            ? `https://localhost:7266/api/quiz/category/${user.category}`
            : 'https://localhost:7266/api/quiz';

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Fel vid hämtning av quiz:', err);
      }
    };

    fetchQuizzes();
  }, [user]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswer = (answer) => {
    const question = selectedQuiz.questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="quiz-container">
        <h1>Spela ett quiz!</h1>
        {quizzes.length === 0 ? (
          <p>Inga quiz tillgängliga.</p>
        ) : (
          quizzes.map((quiz) => (
            <button key={quiz.id} onClick={() => startQuiz(quiz)} className="quiz-select-btn">
              {quiz.name}
            </button>
          ))
        )}
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2>Resultat</h2>
        <p>
          Du fick <strong>{score}</strong> av <strong>{selectedQuiz.questions.length}</strong> rätt!
        </p>

        <button className="quiz-back-btn" onClick={() => setSelectedQuiz(null)}>
          Spela igen
        </button>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{selectedQuiz.name}</h2>
      <p>Fråga {currentQuestionIndex + 1} av {selectedQuiz.questions.length}</p>
      <h3>{question.questionText}</h3>

      <div className="answer-wrapper">
        <div className="answer-grid">
          {question.answers.map((answer, i) => (
            <button key={i} className="answer-btn" onClick={() => handleAnswer(answer)}>
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
