import { Movie } from './movie';
import { CinemaSession } from './session';
import { SnackSelection } from './snack';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'wallet';
export type TicketSyncStatus = 'pending_sync' | 'synced' | 'sync_error';
export type TicketStatus = 'active' | 'used' | 'cancelled';

export type Ticket = {
  id?: string;
  localId: string;
  userId: string;
  userName: string;
  movie: Movie;
  session: CinemaSession;
  seats: string[];
  snacks: SnackSelection[];
  paymentMethod: PaymentMethod;
  total: number;
  purchaseCode: string;
  validationCode: string;
  status: TicketStatus;
  syncStatus: TicketSyncStatus;
  purchasedAt: string;
};
