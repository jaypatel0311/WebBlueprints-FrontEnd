import tokenService from "./tokenService";

// Helper function to get auth header with JWT token
export default function authHeader() {
  const token = tokenService.getToken();

  if (token) {
    // Return authorization header with JWT token
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
