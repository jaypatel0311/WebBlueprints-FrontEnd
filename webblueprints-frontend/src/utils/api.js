import tokenService from "../services/tokenService";

// Define base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const api = {
  get: async (url, options = {}) => {
    const token = tokenService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        response: { data: errorData },
      };
    }

    return response.json();
  },

  post: async (url, data, options = {}) => {
    const token = tokenService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      ...options,
      headers,
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        response: { data: errorData },
      };
    }

    return response.json();
  },

  put: async (url, data, options = {}) => {
    const token = tokenService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      ...options,
      headers,
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        response: { data: errorData },
      };
    }

    return response.json();
  },

  delete: async (url, options = {}) => {
    const token = tokenService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      ...options,
      headers,
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        response: { data: errorData },
      };
    }

    return response.json();
  },

  patch: async (url, data, options = {}) => {
    const token = tokenService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${url}`, {
      method: "PATCH",
      ...options,
      headers,
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        response: { data: errorData },
      };
    }

    return response.json();
  },
};
