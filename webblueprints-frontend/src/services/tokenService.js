class TokenService {
  getToken() {
    return localStorage.getItem("access_token");
  }

  setToken(token) {
    localStorage.setItem("access_token", token);
  }

  removeToken() {
    localStorage.removeItem("access_token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  setRefreshToken(token) {
    localStorage.setItem("refresh_token", token);
  }

  removeRefreshToken() {
    localStorage.removeItem("refresh_token");
  }

  getUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user data from localStorage", e);
      return null;
    }
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
