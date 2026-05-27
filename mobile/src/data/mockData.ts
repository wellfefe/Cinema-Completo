import { Movie } from '../types/movie';
import { CinemaSession } from '../types/session';
import { SnackCombo } from '../types/snack';

export const mockMovie: Movie = {
  id: '1',
  title: 'Interestelar',
  posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  shortSynopsis: 'Uma equipe viaja por um buraco de minhoca em busca de um novo lar para a humanidade.',
  synopsis:
    'Com a Terra chegando ao limite, um grupo de exploradores atravessa um buraco de minhoca para encontrar um planeta habitavel e salvar o futuro da humanidade.',
  genre: 'Ficcao',
  rating: '10 anos',
  durationMinutes: 169,
  cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
};

export const mockMovies: Movie[] = [
  mockMovie,
  {
    id: '2',
    title: 'Divertida Mente 2',
    posterUrl: 'https://image.tmdb.org/t/p/w500/xGvz7nlGQeePcVOpAzOcHsC7kRt.jpg',
    shortSynopsis: 'Riley cresce e novas emocoes chegam para reorganizar tudo.',
    synopsis:
      'A mente de Riley passa por mudancas quando Ansiedade, Inveja, Vergonha e Tedio chegam ao centro de comando.',
    genre: 'Animacao',
    rating: 'Livre',
    durationMinutes: 96,
    cast: 'Amy Poehler, Maya Hawke',
  },
  {
    id: '3',
    title: 'Duna: Parte Dois',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    shortSynopsis: 'Paul Atreides se une aos Fremen para enfrentar a Casa Harkonnen.',
    synopsis:
      'Paul Atreides busca vinganca, poder e destino em Arrakis enquanto uma guerra se aproxima.',
    genre: 'Aventura',
    rating: '14 anos',
    durationMinutes: 166,
    cast: 'Timothee Chalamet, Zendaya, Rebecca Ferguson',
  },
];

export const mockSession: CinemaSession = {
  id: 'session-1',
  movieId: '1',
  date: '2026-06-01T00:00:00.000Z',
  time: '19:30',
  room: 'Sala 1',
  exhibitionType: 'IMAX',
  language: 'Legendado',
  basePrice: 28,
  availableSeats: 36,
  occupiedSeats: ['A1', 'A2', 'C4', 'D7'],
};

export const mockSessions: CinemaSession[] = [
  mockSession,
  {
    id: 'session-2',
    movieId: '1',
    date: '2026-06-01T00:00:00.000Z',
    time: '21:45',
    room: 'Sala VIP',
    exhibitionType: 'VIP',
    language: 'Dublado',
    basePrice: 42,
    availableSeats: 22,
    occupiedSeats: ['B1', 'B2', 'B3', 'E5'],
  },
  {
    id: 'session-3',
    movieId: '2',
    date: '2026-06-02T00:00:00.000Z',
    time: '16:00',
    room: 'Sala 2',
    exhibitionType: '3D',
    language: 'Dublado',
    basePrice: 24,
    availableSeats: 30,
    occupiedSeats: ['A4', 'A5', 'F1'],
  },
  {
    id: 'session-4',
    movieId: '3',
    date: '2026-06-03T00:00:00.000Z',
    time: '20:20',
    room: 'Sala 3',
    exhibitionType: '2D',
    language: 'Legendado',
    basePrice: 26,
    availableSeats: 28,
    occupiedSeats: ['A1', 'B6', 'C6', 'D6'],
  },
];

export const mockSnacks: SnackCombo[] = [
  {
    id: 'pop-p',
    name: 'Pipoca pequena',
    description: 'Pipoca salgada individual.',
    price: 12,
  },
  {
    id: 'pop-g',
    name: 'Pipoca grande',
    description: 'Pipoca grande para dividir.',
    price: 22,
  },
  {
    id: 'refri',
    name: 'Refrigerante',
    description: 'Copo de 500ml.',
    price: 9,
  },
  {
    id: 'combo-casal',
    name: 'Combo casal',
    description: 'Pipoca grande e dois refrigerantes.',
    price: 35,
  },
  {
    id: 'combo-familia',
    name: 'Combo familia',
    description: 'Duas pipocas grandes e quatro bebidas.',
    price: 64,
  },
];
