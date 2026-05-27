import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '../components/Button';
import { PrivateStackParamList } from '../types/navigation';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Receipt'>;

export function ReceiptScreen({ route, navigation }: Props) {
  const { ticket } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ alignItems: 'center', gap: 12, padding: 18, borderRadius: 8, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Compra aprovada</Text>
        <QRCode value={ticket.validationCode} size={170} />
        <Text style={{ color: '#374151', fontWeight: '800' }}>{ticket.validationCode}</Text>
      </View>

      <View style={{ padding: 14, gap: 8, borderRadius: 8, backgroundColor: '#fff' }}>
        <Text>Codigo da compra: {ticket.purchaseCode}</Text>
        <Text>Cliente: {ticket.userName}</Text>
        <Text>Filme: {ticket.movie.title}</Text>
        <Text>Data: {formatDate(ticket.session.date)}</Text>
        <Text>Horario: {ticket.session.time}</Text>
        <Text>Sala: {ticket.session.room}</Text>
        <Text>Assentos: {ticket.seats.join(', ')}</Text>
        <Text>Combos: {ticket.snacks.length ? ticket.snacks.map(item => `${item.quantity}x ${item.name}`).join(', ') : 'Nenhum'}</Text>
        <Text>Pagamento: {ticket.paymentMethod}</Text>
        <Text>Compra feita em: {new Date(ticket.purchasedAt).toLocaleString('pt-BR')}</Text>
        <Text>Status local: {ticket.syncStatus}</Text>
        <Text style={{ fontSize: 22, fontWeight: '900', color: '#111827' }}>{formatCurrency(ticket.total)}</Text>
      </View>

      <Button title="Ir para Meus ingressos" onPress={() => navigation.navigate('HomeTabs')} />
    </ScrollView>
  );
}
