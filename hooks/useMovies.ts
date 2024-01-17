import { Meta, MovieListProps, PaginationProps } from "@/types";
import { useEffect, useState } from "react";
import { getMovies } from "@/api/movies";

export const useMovies = (data: Meta): { movies: MovieListProps } => {
  const [movies, setMovies] = useState<MovieListProps>({
    data: [],
    meta: {} as PaginationProps,
  });

  useEffect(() => {
    const fetchMovies = async (data: Meta) => {
      const movies = await getMovies(data);
      setMovies(movies);
    };
    fetchMovies(data);
  }, [data.page, data.limit]);

  return { movies };
};
