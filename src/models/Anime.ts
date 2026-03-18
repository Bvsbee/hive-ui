export interface Anime {
  id: number;
  description: string;
  averageScore: number | null;
  startDate: {
    day: number | null;
    month: number | null;
    year: number | null;
  };
  episodes: number | null;
  genres: string[];
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    color: string | null;
    medium: string;
  };
}
