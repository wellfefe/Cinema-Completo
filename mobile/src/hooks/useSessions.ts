import { useQuery } from '@tanstack/react-query';
import { getSessionsByMovieApi } from '../api/sessions.api';

export function useSessions(movieId: string) {
  return useQuery({
    queryKey: ['sessions', movieId],
    queryFn: () => getSessionsByMovieApi(movieId),
  });
}
