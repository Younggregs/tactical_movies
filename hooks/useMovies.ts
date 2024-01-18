import { Meta, MovieListProps, PaginationProps } from "@/types";
import { useEffect, useState } from "react";
import { getMovies } from "@/api/movies";

export const useMovies = (
  data: Meta
): { movies: MovieListProps; isLoading: boolean } => {
  const [movies, setMovies] = useState<MovieListProps>({
    data: [],
    meta: {} as PaginationProps,
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async (data: Meta) => {
      setLoading(true);
      const movies = await getMovies(data);
      setMovies(movies);
      setLoading(false);
    };
    fetchMovies(data);
  }, [data.page, data.limit]);

  return { movies, isLoading };
};
