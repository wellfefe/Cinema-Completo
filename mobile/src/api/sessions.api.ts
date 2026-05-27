import { api } from './client';
import { mockSessions } from '../data/mockData';
import { CinemaSession } from '../types/session';

type BackendSession = {
  id: number;
  filmeId: number;
  horarioExibicao: string;
  sala?: {
    numero: number;
    capacidade: number;
  };
};

function normalizeSession(session: BackendSession): CinemaSession {
  const date = new Date(session.horarioExibicao);

  return {
    id: String(session.id),
    movieId: String(session.filmeId),
    date: date.toISOString(),
    time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    room: session.sala ? `Sala ${session.sala.numero}` : 'Sala 1',
    exhibitionType: '2D',
    language: 'Dublado',
    basePrice: 28,
    availableSeats: session.sala?.capacidade ?? 40,
    occupiedSeats: ['A1', 'A2', 'B4'],
  };
}

export async function getSessionsByMovieApi(movieId: string) {
  try {
    const { data } = await api.get<BackendSession[]>('/sessao');
    const sessions = data.map(normalizeSession).filter(session => session.movieId === movieId);

    if (sessions.length === 0) {
      return mockSessions.filter(session => session.movieId === movieId);
    }

    return sessions;
  } catch {
    return mockSessions.filter(session => session.movieId === movieId);
  }
}
