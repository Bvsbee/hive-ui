  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  // get image url based on media type
  export const getImageUrl = (item: any) => {
    const media = item.media;
    const mediaType = media.mediaType;

    // movies and tv show
    if (mediaType === "MOVIE"  && media.movieDetails){
      return `${baseUrl}${media.movieDetails.posterPath}`;
    }
    if (mediaType === "TV" && media.tvDetails){
      return `${baseUrl}${media.tvDetails.postPath}`;
    }
    // anime uses direct url
    if (mediaType === "ANIME" && media.animeDetails){
      return media.animeDetails.coverImageUrl;
    }
    // book uses direct url
    if (mediaType === "BOOK" && media.bookDetails){
      return media.bookDetails.bookImageUrl;
    }
    return null;
  };

  //generate media label based on media type
  export const getMediaTypeLabel = (item: any) => {
  const mediaType = item.media?.mediaType;
  switch (mediaType) {
    case "MOVIE":
      return "Movie";
    case "TV":
      return "TV Show";
    case "ANIME":
      return "Anime";
    case "BOOK":
      return "Book";
    default:
      return "Media";
  }
};

//get year from mediad details
export const getYear = (item: any) => {
    const media = item.media;
    const mediaType = media.mediaType;

    if (mediaType === "MOVIE" && media.movieDetails?.releaseDate) {
        return new Date(media.movieDetails.releaseDate).getFullYear();
        }
        //TV show
    if (mediaType === "TV" && media.tvDetails?.firstAirDate) {
        return new Date(media.tvDetails.firstAirDate).getFullYear();
        }
        //add anime and books
    if (mediaType === "ANIME" && media.animeDetails?.startDate) {
        return new Date(media.animeDetails.startDate).getFullYear();
        }
        // no publish date for books from api
    // if (mediaType === "BOOK" && media.bookDetails?.publishedDate) {
    //     return new Date(media.bookDetails.publishedDate).getFullYear();
    //     }

    };

    //get ratings for media items
export const getRating = (item: any) => {
    const media = item.media;
    const mediaType = media.mediaType;

    if (mediaType === "MOVIE" && media.movieDetails?.rating) {
        return media.movieDetails.rating;
        }
        //TV show
    if (mediaType === "TV" && media.tvDetails?.rating) {
        return media.tvDetails.rating;
        }
        //add anime books doesnt have ratings
    if (mediaType === "ANIME" && media.animeDetails?.averageScore) {
        return media.animeDetails.averageScore/10; //convert to 10 point scale anilist is 100 point
        }
    };