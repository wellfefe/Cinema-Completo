import { useCallback, useState } from 'react';
import { ticketRepository } from '../database/ticketRepository';
import { Ticket } from '../types/ticket';

export function useTickets(userId?: string) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const refreshTickets = useCallback(() => {
    if (!userId) {
      setTickets([]);
      return;
    }

    setTickets(ticketRepository.findByUserId(userId));
  }, [userId]);

  return {
    tickets,
    refreshTickets,
  };
}
