import { api } from './client';
import { Ticket } from '../types/ticket';

export async function createTicketApi(ticket: Ticket): Promise<{ id: string }> {
  const { data } = await api.post('/pedido', {
    localId: ticket.localId,
    userId: ticket.userId,
    filmeId: Number(ticket.movie.id),
    sessaoId: Number(ticket.session.id),
    qInteira: ticket.seats.length,
    qMeia: 0,
    assentos: ticket.seats,
    lanches: ticket.snacks.map(snack => ({
      id: snack.id,
      quantidade: snack.quantity,
    })),
    formaPagamento: ticket.paymentMethod,
    valorTotal: ticket.total,
    dataCompra: ticket.purchasedAt,
  });

  return {
    id: String(data.id ?? ticket.localId),
  };
}
