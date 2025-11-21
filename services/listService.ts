import { useQuery } from "@tanstack/react-query";
import hiveAPI from "./hiveAPI";


//fetch function to get user lists
export const fetchUserLists = async (userGuid: string) => {
  const response = await hiveAPI.get(`/list/${userGuid}`);
  return response.data;
};

//hook to fetch user lists
export const useFetchUserLists = (userGuid: string) => {
  return useQuery({
    queryKey: ["userLists", userGuid],
    queryFn: () => fetchUserLists(userGuid!),
  });
};