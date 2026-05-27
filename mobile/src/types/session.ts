export type ExhibitionType = '2D' | '3D' | 'IMAX' | 'VIP';
export type SessionLanguage = 'Dublado' | 'Legendado';

export type CinemaSession = {
  id: string;
  movieId: string;
  date: string;
  time: string;
  room: string;
  exhibitionType: ExhibitionType;
  language: SessionLanguage;
  basePrice: number;
  availableSeats: number;
  occupiedSeats: string[];
};
