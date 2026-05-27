import { Movie } from '../types/movie';
import { CinemaSession } from '../types/session';
import { SnackSelection } from '../types/snack';
import { PaymentMethod, Ticket } from '../types/ticket';
import { generateCode } from '../utils/generateCode';

type BuildTicketInput = {
  userId: string;
  userName: string;
  movie: Movie;
  session: CinemaSession;
  seats: string[];
  snacks: SnackSelection[];
  paymentMethod: PaymentMethod;
  total: number;
  isConnected: boolean;
  now?: Date;
};

export function buildTicket({
  userId,
  userName,
  movie,
  session,
  seats,
  snacks,
  paymentMethod,
  total,
  isConnected,
  now = new Date(),
}: BuildTicketInput): Ticket {
  return {
    localId: generateCode('LOCAL', now),
    userId,
    userName,
    movie,
    session,
    seats,
    snacks,
    paymentMethod,
    total,
    purchaseCode: generateCode('COMPRA', now),
    validationCode: generateCode('VALIDA', now),
    status: 'active',
    syncStatus: isConnected ? 'synced' : 'pending_sync',
    purchasedAt: now.toISOString(),
  };
}
