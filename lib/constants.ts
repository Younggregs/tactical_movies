import { Meta } from "@/types";

const META_DEFAULT: Meta = {
  page: 1,
  limit: 8,
};

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com/api"
    : "http://localhost:8000/api";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com/"
    : "http://localhost:8000/";

export { API_BASE_URL, BASE_URL, META_DEFAULT };
