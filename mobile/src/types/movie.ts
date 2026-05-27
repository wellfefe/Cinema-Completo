export type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  shortSynopsis: string;
  synopsis: string;
  genre: string;
  rating: string;
  durationMinutes: number;
  cast?: string;
};
