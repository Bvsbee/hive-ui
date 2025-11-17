import { useQuery } from "@tanstack/react-query";
import hiveAPI from "./hiveAPI";
import { TvShow } from "../models/tvShow";
import { Movie } from "../models/Movie";
import { Book } from "../models/Book";
import { Anime } from "../models/Anime";

export const fetchTvShows = async () => {
  const response = await hiveAPI.get("/tmdb/discover/tv");
  return response.data;
};

export const useFetchTvShows = () => {
  return useQuery<TvShow[]>({
    queryKey: ["tvShows"],
    queryFn: fetchTvShows,
  });
};

export const fetchMovies = async () => {
  const response = await hiveAPI.get("/tmdb/discover/movie");
  return response.data;
};

export const useFetchMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};

export const fetchBooks = async () => {
  const response = await hiveAPI.get("/book/nytimes");
  return response.data;
};

export const useFetchBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const fetchAnime = async () => {
  const response = await hiveAPI.get("/ani-list/anime/popular");
  console.log(response);
  return response.data;
};

export const useFetchAnime = () => {
  return useQuery<Anime[]>({
    queryKey: ["anime"],
    queryFn: fetchAnime,
  });
};
