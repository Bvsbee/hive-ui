import { useQuery } from "@tanstack/react-query";
import hiveAPI from "./hiveAPI";
import { TvShow } from "../models/tvShow";

const fetchTvShows = async () => {
  const response = await hiveAPI.get("/tmdb/discover/tv");
  return response.data;
};

export const useFetchTvShows = () => {
  return useQuery<TvShow[]>({
    queryKey: ["tvShows"],
    queryFn: fetchTvShows,
  });
};
