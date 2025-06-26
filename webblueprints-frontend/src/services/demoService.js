// frontend/src/services/demoService.js
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class DemoService {
  generateDemo(templateId) {
    return axios.post(
      `${API_URL}/templates/${templateId}/demo`,
      {},
      { headers: authHeader() }
    );
  }

  getDemoDetails(templateId) {
    return axios.get(`${API_URL}/templates/${templateId}/demo`);
  }

  removeDemo(templateId) {
    return axios.delete(`${API_URL}/templates/${templateId}/demo`, {
      headers: authHeader(),
    });
  }
}

export default new DemoService();
