class AuthTestHelper {
  static instance = null;
  API_URL = "http://localhost:3001/api"; // Fix API URL

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthTestHelper();
    }
    return this.instance;
  }

  async testAuthFlow() {
    console.group("Testing Auth Flow");
    await this.testLogin();
    this.verifyTokenStorage();
    await this.testProtectedRoute();
    console.groupEnd();
  }

  async testLogin(email = "test@example.com", password = "password123") {
    console.log("Testing Login...");
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login Response:", data);
      return data;
    } catch (error) {
      console.error("Login Failed:", error);
      throw error;
    }
  }

  verifyTokenStorage() {
    console.log("Verifying Token Storage...");
    const token = localStorage.getItem("jwt_token");
    const refreshToken = localStorage.getItem("refresh_token");
    console.log({
      hasToken: !!token,
      hasRefreshToken: !!refreshToken,
      token: token?.substring(0, 20) + "...",
      refreshToken: refreshToken?.substring(0, 20) + "...",
    });
  }

  async testProtectedRoute() {
    console.log("Testing Protected Route...");
    const token = localStorage.getItem("jwt_token");
    try {
      const response = await fetch(`${this.API_URL}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Protected Route Response:", data);
      return data;
    } catch (error) {
      console.error("Protected Route Failed:", error);
      throw error;
    }
  }

  clearAuth() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("refresh_token");
    console.log("Auth Data Cleared");
  }
}

window.authTest = AuthTestHelper.getInstance();
export default AuthTestHelper;
