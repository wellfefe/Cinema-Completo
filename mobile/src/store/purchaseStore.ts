import { create } from 'zustand';
import { Movie } from '../types/movie';
import { CinemaSession } from '../types/session';
import { SnackSelection } from '../types/snack';

type PurchaseState = {
  movie: Movie | null;
  session: CinemaSession | null;
  seats: string[];
  snacks: SnackSelection[];
  setMovieAndSession: (movie: Movie, session: CinemaSession) => void;
  setSeats: (seats: string[]) => void;
  setSnacks: (snacks: SnackSelection[]) => void;
  clearPurchase: () => void;
};

export const usePurchaseStore = create<PurchaseState>(set => ({
  movie: null,
  session: null,
  seats: [],
  snacks: [],
  setMovieAndSession: (movie, session) => set({ movie, session }),
  setSeats: seats => set({ seats }),
  setSnacks: snacks => set({ snacks }),
  clearPurchase: () => set({ movie: null, session: null, seats: [], snacks: [] }),
}));
