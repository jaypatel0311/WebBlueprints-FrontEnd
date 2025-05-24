import { authService } from "../services/authService";

export const api = {
  get: async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return response.json();
  },

  post: async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
