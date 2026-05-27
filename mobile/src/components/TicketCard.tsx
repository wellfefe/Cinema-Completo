import { Pressable, Text, View } from 'react-native';
import { Ticket } from '../types/ticket';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

type TicketCardProps = {
  ticket: Ticket;
  onPress: () => void;
};

export function TicketCard({ ticket, onPress }: TicketCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        gap: 6,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
        {ticket.movie.title}
      </Text>
      <Text style={{ color: '#374151' }}>
        {formatDate(ticket.session.date)} as {ticket.session.time} | {ticket.session.room}
      </Text>
      <Text style={{ color: '#374151' }}>Assentos: {ticket.seats.join(', ')}</Text>
      <Text style={{ color: '#374151' }}>Compra: {ticket.purchaseCode}</Text>
      <Text style={{ color: '#111827', fontWeight: '800' }}>{formatCurrency(ticket.total)}</Text>
      <Text style={{ color: ticket.syncStatus === 'synced' ? '#047857' : '#B45309' }}>
        Sync: {ticket.syncStatus}
      </Text>
    </Pressable>
  );
}
