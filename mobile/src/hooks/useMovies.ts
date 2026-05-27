import { useQuery } from '@tanstack/react-query';
import { getMoviesApi } from '../api/movies.api';

export function useMovies() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: getMoviesApi,
  });
}
