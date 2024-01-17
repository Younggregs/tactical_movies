import { MovieProps } from "@/types";
import { useEffect, useState } from "react";
import { getMovieById } from "@/api/movies";

export const useSingleMovie = (
  id: string
): { movie: MovieProps; isLoading: Boolean } => {
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      setIsLoading(true);
      const movies = await getMovieById(id);
      setMovie(movies);
    };
    fetchMovie(id);
  }, [id]);

  return { movie, isLoading };
};
