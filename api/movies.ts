import { API_BASE_URL } from "@/lib/constants";
import { Meta, PaginationProps, movieSchema } from "@/types";
import jsCookie from "js-cookie";
import { z } from "zod";

const getMovies = async (data: Meta) => {
  const params = new URLSearchParams(data as any).toString();
  const token = jsCookie.get("token");
  const response = await fetch(`${API_BASE_URL}/movies?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const token = jsCookie.get("token");
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

const createMovie = async (data: z.infer<typeof movieSchema>) => {
  const token = jsCookie.get("token");
  const response = await fetch(`${API_BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

const getMovieById = async (id: string) => {
  const token = jsCookie.get("token");
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

const updateMovie = async (id: string, data: z.infer<typeof movieSchema>) => {
  const token = jsCookie.get("token");
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

export { getMovies, uploadImage, createMovie, getMovieById, updateMovie };
