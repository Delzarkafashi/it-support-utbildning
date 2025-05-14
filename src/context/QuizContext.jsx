import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState({
    name: "",
    category: "",
    questions: []
  });

  const updateQuizInfo = (info) => {
    setQuizData((prev) => ({ ...prev, ...info }));
  };

  const addQuestion = (question) => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, question]
    }));
  };

  const resetQuiz = () => {
    setQuizData({
      name: "",
      category: "",
      questions: []
    });
  };

  return (
    <QuizContext.Provider value={{ quizData, updateQuizInfo, addQuestion, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
