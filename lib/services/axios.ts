import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get current school from cookie if exists
    const currentSchool = document.cookie
      .split("; ")
      .find((row) => row.startsWith("currentSchool="))
      ?.split("=")[1];

    if (currentSchool) {
      config.headers["X-School-Id"] = currentSchool;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      "Une erreur est survenue, veuillez réessayer ultérieurement";
    toast.error(message, {
      delay: 2000,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
