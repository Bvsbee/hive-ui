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

// fetch fucntion to fet recently added 
export const fetchRecentlyAddedMedia = async (userGuid: string) => {
  const response = await hiveAPI.get(`/list/recentMedia/${userGuid}`);
  return response.data;
};

// hook to fetch recently added media
export const useFetchRecentlyAddedMedia = (userGuid: string) => {
  return useQuery({
    queryKey: ["recentMedia", userGuid],
    queryFn: () => fetchRecentlyAddedMedia(userGuid!),
    enabled: !!userGuid,
  });

};

// 🔧 Normalize ANY media item into the backend DTO shape
export const normalizeMedia = (item: any, listGuid: string) => {
  // Prefer explicit mediaType if present
  const mediaType = item.mediaType;


  // ---- ANIME ----
if (mediaType === "ANIME" || item.coverImage) {
  return {
    listGuid,
    title: item.title?.english ?? item.title?.romaji ?? "Untitled",
    mediaType: "ANIME",
    animeDetails: {
      coverImageUrl: item.coverImage?.large ?? item.coverImage?.medium,
      description: item.description ?? "",
      averageScore: item.averageScore ?? null,

      titleRomaji: item.title?.romaji ?? "Unknown",

      titleEnglish: item.title?.english ?? null,
      titleNative: item.title?.native ?? null,
      episodes: item.episodes ?? null,
      coverImageColor: item.coverImage?.color ?? null,
      genres: item.genres ?? [],
      startDate: item.startDate?.year
        ? new Date(
            item.startDate.year,
            item.startDate.month - 1,
            item.startDate.day || 1
          )
        : null,
    },
  };
}


  // ---- MOVIE ----
if (mediaType === "MOVIE" || item.releaseDate) {
  return {
    listGuid,
    title: item.title,
    mediaType: "MOVIE",
    movieDetails: {
      posterPath: item.posterPath ?? "",
      overview: item.overview ?? "",
      releaseDate: new Date(item.releaseDate || new Date()).toISOString(),
      rating: item.rating ?? 0,
      genre: item.genres ?? [],      
      video: item.video ? String(item.video) : "",
      },
    };
  }

  // ---- TV ----
if (mediaType === "TV" || item.firstAirDate) {
  return {
    listGuid,
    title: item.name,
    mediaType: "TV",
    tvDetails: {
      postPath: item.posterPath ?? "",          
      backDropPath: item.backdropPath ?? "",    
      overview: item.overview ?? "",
      firstAirDate: item.firstAirDate
        ? new Date(item.firstAirDate).toISOString()
        : new Date().toISOString(),
      rating: item.rating ?? 0,
      video: item.video ? String(item.video) : "",
      genre: item.genres ?? [],   
      },
    };
  }

 // ---- BOOK ----
if (mediaType === "BOOK" || item.book_image) {
  return {
   listGuid,
      title: item.title,
      mediaType: "BOOK",
      bookDetails: {
        title: item.title,
        author: item.author,
        description: item.description ?? "",
        publishedDate: new Date(item.published_date || new Date()).toISOString(),
        bookImageUrl: item.book_image,
    },
  };
}



  throw new Error("Unknown media type — cannot normalize.");
};

// 🔧 POST /list-item
const addItemToList = async (payload: any) => {
  const response = await hiveAPI.post("/list-item", payload);
  return response.data;
};

// 🔧 React Query mutation hook
export const useAddItemToList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addItemToList,
    onSuccess: () => {
      // optional: invalidate related data
      queryClient.invalidateQueries({ queryKey: ["recentMedia"] });
      queryClient.invalidateQueries({ queryKey: ["userLists"] });
    },
  });
};