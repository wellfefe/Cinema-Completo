import { api } from './client';
import { mockMovies } from '../data/mockData';
import { Movie } from '../types/movie';
import { getMoviePosterUrl } from '../utils/getMoviePosterUrl';

type BackendMovie = {
  id: number;
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  elenco?: string;
  genero: string;
};

function normalizeMovie(movie: BackendMovie): Movie {
  return {
    id: String(movie.id),
    title: movie.titulo,
    posterUrl: getMoviePosterUrl(movie.titulo),
    shortSynopsis: movie.sinopse.slice(0, 110),
    synopsis: movie.sinopse,
    genre: movie.genero,
    rating: movie.classificacao,
    durationMinutes: movie.duracao,
    cast: movie.elenco,
  };
}

export async function getMoviesApi() {
  try {
    const { data } = await api.get<BackendMovie[]>('/filme');
    if (data.length === 0) {
      return mockMovies;
    }

    return data.map(normalizeMovie);
  } catch {
    return mockMovies;
  }
}
