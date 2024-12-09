import { toast } from "sonner";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = new ApiError(response.status, response.statusText);
    throw error;
  }
  return response.json();
}

export const apiClient = {
  get: async (url: string) => {
    try {
      const response = await fetch(url);
      return handleResponse(response);
    } catch (error) {
      toast.error("Une erreur est survenue lors de la récupération des données");
      throw error;
    }
  },

  post: async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'envoi des données");
      throw error;
    }
  },

  patch: async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des données");
      throw error;
    }
  },

  delete: async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      return handleResponse(response);
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression des données");
      throw error;
    }
  },
};