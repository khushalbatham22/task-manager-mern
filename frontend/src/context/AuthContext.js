import { createContext, useContext, useState } from "react";
import { accessToken } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = accessToken.getAccessToken();
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
