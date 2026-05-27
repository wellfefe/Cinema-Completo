import { CinemaSession } from './session';
import { Movie } from './movie';
import { Ticket } from './ticket';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type PrivateStackParamList = {
  HomeTabs: undefined;
  MovieDetails: { movie: Movie };
  Sessions: { movie: Movie };
  SeatSelection: { movie: Movie; session: CinemaSession };
  SnackCombo: undefined;
  Payment: undefined;
  Receipt: { ticket: Ticket };
};

export type TabParamList = {
  Movies: undefined;
  MyTickets: undefined;
};
