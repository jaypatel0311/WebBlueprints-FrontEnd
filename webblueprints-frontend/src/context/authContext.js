import { createContext, useState, useContext, useEffect } from "react";
import tokenService from "../services/tokenService";
import api from "../utils/axiosInterceptor";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => tokenService.getUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateAuth = async () => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await api.get("/auth/validate");
      const userData = response.data;
      setUser(userData);
      tokenService.setUser(userData);
    } catch (err) {
      console.error("Auth validation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, user: userData } = response.data;

      tokenService.setToken(accessToken);
      tokenService.setRefreshToken(refreshToken);
      tokenService.setUser(userData);
      setUser(userData);

      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      tokenService.clearAll();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
