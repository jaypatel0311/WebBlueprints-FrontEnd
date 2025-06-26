import { createContext, useState, useContext, useEffect } from "react";
import tokenService from "../services/tokenService";
import api from "../utils/axiosInterceptor";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage - important for page refreshes
  const [user, setUser] = useState(() => tokenService.getUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate authentication token on component mount
  const validateAuth = async () => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        // No token found, clear any stale data
        tokenService.removeUser();
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Set user from localStorage first for immediate UI update
      const storedUser = tokenService.getUser();
      if (storedUser) {
        setUser(storedUser);
      }

      // Then verify with backend
      try {
        const response = await api.get("/auth/validate");
        const userData = response.data;

        // Update user data if server response is different
        if (JSON.stringify(userData) !== JSON.stringify(storedUser)) {
          setUser(userData);
          tokenService.setUser(userData);
          console.log("User data updated from server:", userData);
        }
      } catch (verifyErr) {
        // Token validation failed - likely expired or invalid
        console.error("Token validation failed:", verifyErr);

        if (
          verifyErr.response?.status === 401 ||
          verifyErr.response?.status === 403
        ) {
          // Clear invalid authentication data
          logout();
        }
      }
    } catch (err) {
      console.error("Auth validation error:", err);
      setError("Authentication error. Please log in again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Call validateAuth when component mounts
  useEffect(() => {
    validateAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login function
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", credentials);
      console.log("Login response:", response);

      // Handle different response formats
      const { token, user: userData, accessToken } = response.data;

      // Store the token (handle different API response formats)
      const authToken = token || accessToken;
      if (authToken) {
        tokenService.setToken(authToken);
      } else {
        throw new Error("No authentication token received");
      }

      // Store user data
      const userToStore = userData || response.data.user || response.data;

      tokenService.setUser(userToStore);
      console.log("User data stored in token service:", userToStore);

      setUser(userToStore);

      return userToStore;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear all auth data
    tokenService.removeToken();
    tokenService.removeRefreshToken();
    tokenService.removeUser();

    // Update state
    setUser(null);
    setError(null);
  };

  // Helper to check if user is admin
  const isAdmin = () => {
    return user && user.role === "admin";
  };

  // Context value
  const contextValue = {
    user,
    setUser,
    isLoading,
    error,
    login,
    logout,
    validateAuth,
    isAuthenticated: !!user,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
