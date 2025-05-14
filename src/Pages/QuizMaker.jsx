import React, { useState } from 'react';
import './QuizMaker.css';

const QuizMaker = () => {
  const [username, setUsername] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      answers: [''],
      correctAnswer: ''
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: [''], correctAnswer: '' }]);
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push('');
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    const payload = {
      name: quizTitle,
      category: 'Custom',
      questions: questions.map((q) => ({
        questionText: q.questionText,
        answers: q.answers,
        correctAnswer: q.correctAnswer || ''
      }))
    };
    const resetForm = () => {
        setUsername('');
        setQuizTitle('');
        setQuestions([
          {
            questionText: '',
            answers: [''],
            correctAnswer: ''
          }
        ]);
      };
      

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('https://localhost:7266/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`✅ Quiz sparat! ID: ${data.id}`);
        setTimeout(() => setSuccessMessage(''), 4000);
        resetForm();
      } else {
        setSuccessMessage('❌ Ett fel uppstod när quizet skulle sparas.');
      }
    } catch (error) {
      console.error('Fel vid fetch:', error);
      setSuccessMessage('❌ Serverfel eller kunde inte nå API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Skapa Quiz</h1>

      {successMessage && (
        <div className="success-box">
          {successMessage}
        </div>
      )}

      <input
        placeholder="Ditt namn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Quiz titel"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-block">
          <label>Fråga</label>
          <input
            className="question-input"
            placeholder="Fråga"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />

          <div className="answers-list">
            {q.answers.map((a, aIndex) => (
              <input
                key={aIndex}
                className="answer-input"
                placeholder={`Svar ${aIndex + 1}`}
                value={a}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
              />
            ))}
          </div>

          <button className="add-answer-btn" onClick={() => handleAddAnswer(qIndex)}>
            Lägg till svar
          </button>

          <input
            className="correct-answer-input"
            placeholder="Rätt svar"
            value={q.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddQuestion}>Lägg till fråga</button>

      <div className="save-quiz-wrapper">
        <button className="save-quiz-btn" onClick={handleSaveQuiz} disabled={isLoading}>
          {isLoading ? 'Sparar...' : 'Spara quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizMaker;
