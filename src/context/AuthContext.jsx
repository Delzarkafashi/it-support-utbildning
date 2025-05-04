import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name,  
          email: decoded.email,
          role: decoded.role,
          token: token
        });
      } catch (err) {
        console.error("Ogiltig token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (data) => {
    if (data.token) {
      try {
        const decoded = jwtDecode(data.token);
        const userData = {
          name: decoded.name,  
          email: decoded.email,
          role: decoded.role,
          token: data.token
        };
        setUser(userData);
        localStorage.setItem("token", data.token);
      } catch (err) {
        console.error("Token kunde inte avkodas:", err);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
