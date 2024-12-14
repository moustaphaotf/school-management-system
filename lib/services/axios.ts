import axios from "axios";
import { signOut } from "next-auth/react";
import { toastError } from "../utils/toast";

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
    toastError(message, {
      delay: 2000,
    });
    if (error.response?.status === 401) {
      const callbackUrl = encodeURIComponent(window.location.href);
      signOut({ callbackUrl: `/auth/login?redirect=${callbackUrl}` });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
