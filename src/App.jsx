import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Tjanster from "./Pages/Tjanster";
import Kurser from "./Pages/Kurser";
import Kontakt from "./Pages/Kontakt";
import Quiz from "./Pages/Quiz";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Integritetspolicy from "./Pages/Integritetspolicy";
import Anvandarvillkor from "./Pages/Anvandarvillkor";
import Cookies from "./Pages/Cookies";
import ByggaHemsidor from "./Pages/ByggaHemsidor"; 
import AgilScrum from "./Pages/AgilScrum";
import Teamutveckling from "./Pages/Teamutveckling";
import ForgotPassword from "./Pages/ForgotPassword"; 
import Test from "./Pages/Test/Test";
import QuizMaker from './Pages/QuizMaker';
import QuizPlay from "./Pages/QuizPlay";
import QuizEdit from './Pages/QuizEdit';
import AdminUserCategoryAssign from "./Pages/AdminUserCategoryAssign";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tjanster" element={<Tjanster />} />
        <Route path="kurser" element={<Kurser />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="integritetspolicy" element={<Integritetspolicy />} />
        <Route path="anvandarvillkor" element={<Anvandarvillkor />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="bygga-hemsidor" element={<ByggaHemsidor />} />
        <Route path="agil-scrum" element={<AgilScrum />} />
        <Route path="teamutveckling" element={<Teamutveckling />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="test" element={<Test />} />
        <Route path="/quizmaker" element={<QuizMaker />} />
        <Route path="quizplay" element={<QuizPlay />} />
        <Route path="quizedit" element={<QuizEdit />} />
        <Route path="quizplay/:id" element={<QuizPlay />} />
        <Route path="/admin/categories" element={<AdminUserCategoryAssign />} />
      </Route>
    </Routes>
  );
}

export default App;
