const BASE_URL = "your-api-url";

export const api = {
  templates: {
    getAll: () => fetch(`${BASE_URL}/templates`).then((res) => res.json()),
    getById: (id) =>
      fetch(`${BASE_URL}/templates/${id}`).then((res) => res.json()),
  },
  auth: {
    login: (credentials) =>
      fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then((res) => res.json()),
    signup: (userData) =>
      fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }).then((res) => res.json()),
  },
};
