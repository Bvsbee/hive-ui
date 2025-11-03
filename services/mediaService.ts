import { useQuery } from "@tanstack/react-query";
import hiveAPI from "./hiveAPI";
import axios from "axios";

export const getTvShows = async () => {
  axios.get("http://localhost:3000/tmdb/discover/tv").then((response) => {
    return response.data;
  });
};
