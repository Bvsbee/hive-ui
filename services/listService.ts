import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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


//create list function
export const createList = async (listData: {
    userGuid: string;
    name: string;
    icon: string;
    allowedMediaTypes: string[];
}) => {
    const response = await hiveAPI.post("/list", listData);
    return response.data;
};

//hook to create list
export const useCreateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createList ,
        onSuccess: (data, variables) => {
            // Invalidate and refetch user lists after creating a new list
            queryClient.invalidateQueries({ queryKey: ["userLists", variables.userGuid] });
        },
    })};

