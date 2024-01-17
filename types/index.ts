import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const movieSchema = z.object({
  title: z.string().min(3),
  publishingYear: z.string().min(4),
  imageUrl: z.string().optional(),
});

export type PaginationProps = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Meta = {
  page: number;
  limit: number;
};

export type MovieProps = {
  id?: string;
  title: string;
  publishingYear: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MovieListProps = {
  data: MovieProps[];
  meta: PaginationProps;
};
