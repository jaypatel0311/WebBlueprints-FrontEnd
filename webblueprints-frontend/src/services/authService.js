import api from "../utils/axiosInterceptor";
import tokenService from "./tokenService";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }
  return response.json();
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, user } = response.data;

      if (accessToken && refreshToken) {
        tokenService.setToken(accessToken);
        tokenService.setRefreshToken(refreshToken);
        tokenService.setUser(user);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  validateToken: async () => {
    try {
      const token = tokenService.getToken();
      if (!token) throw new Error("No token found");

      const response = await api.get("/auth/validate");
      return response.data;
    } catch (error) {
      tokenService.clearAll();
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const response = await api.post("/auth/refresh", { refreshToken });
      const { accessToken } = response.data;

      if (accessToken) {
        tokenService.setToken(accessToken);
      }

      return response.data;
    } catch (error) {
      tokenService.clearAll();
      throw error;
    }
  },

  changePassword: async ({ userId, currentPassword, newPassword }) => {
    const response = await api.put("/auth/change-password", {
      userId,
      oldPassword: currentPassword,
      newPassword,
    });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      tokenService.clearAll();
    } catch (error) {
      console.error("Logout failed:", error);
      tokenService.clearAll();
    }
  },
};
