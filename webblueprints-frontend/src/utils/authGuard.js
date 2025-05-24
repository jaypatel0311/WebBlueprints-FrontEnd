import { authService } from "../services/authService";

export const authGuard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  // Verify token expiration if needed
  try {
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    if (tokenData.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
};
