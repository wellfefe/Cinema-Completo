import NetInfo from '@react-native-community/netinfo';
import { createTicketApi } from '../api/tickets.api';
import { ticketRepository } from './ticketRepository';

export async function syncPendingTickets() {
  const state = await NetInfo.fetch();

  if (!state.isConnected) return;

  const pendingTickets = ticketRepository.findPendingSync();

  for (const ticket of pendingTickets) {
    try {
      const response = await createTicketApi(ticket);
      ticketRepository.markAsSynced(ticket.localId, response.id);
    } catch {
      ticketRepository.markAsSyncError(ticket.localId);
    }
  }
}

export function startSyncListener() {
  return NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncPendingTickets();
    }
  });
}
