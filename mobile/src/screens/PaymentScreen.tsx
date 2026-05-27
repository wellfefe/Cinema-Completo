import NetInfo from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ticketRepository } from '../database/ticketRepository';
import { useAuth } from '../hooks/useAuth';
import { simulatePayment } from '../services/paymentService';
import { buildTicket } from '../services/ticketFactory';
import { calculatePurchaseTotal } from '../services/ticketService';
import { usePurchaseStore } from '../store/purchaseStore';
import { PaymentMethod } from '../types/ticket';
import { PrivateStackParamList } from '../types/navigation';
import { formatCurrency } from '../utils/formatCurrency';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Payment'>;

const paymentOptions: { label: string; value: PaymentMethod }[] = [
  { label: 'Cartao de credito', value: 'credit_card' },
  { label: 'Cartao de debito', value: 'debit_card' },
  { label: 'Pix', value: 'pix' },
  { label: 'Carteira digital', value: 'wallet' },
];

export function PaymentScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { movie, session, seats, snacks, clearPurchase } = usePurchaseStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    if (!session) return 0;
    return calculatePurchaseTotal({
      seatCount: seats.length,
      ticketPrice: session.basePrice,
      snacks,
    });
  }, [seats.length, snacks, session]);

  async function handlePayment() {
    if (!user || !movie || !session || seats.length === 0) {
      Alert.alert('Pagamento', 'Compra incompleta. Volte e escolha uma sessao e assentos.');
      return;
    }

    try {
      setLoading(true);
      const payment = await simulatePayment(total, paymentMethod);

      if (!payment.approved) {
        Alert.alert('Pagamento', payment.message);
        return;
      }

      const state = await NetInfo.fetch();
      const ticket = buildTicket({
        userId: user.id,
        userName: user.name,
        movie,
        session,
        seats,
        snacks,
        paymentMethod,
        total,
        isConnected: Boolean(state.isConnected),
      });

      ticketRepository.save(ticket);
      clearPurchase();
      navigation.replace('Receipt', { ticket });
    } catch {
      Alert.alert('Pagamento', 'Nao foi possivel concluir o pagamento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Resumo da compra</Text>

      <View style={{ padding: 14, gap: 8, borderRadius: 8, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '800', color: '#111827' }}>Filme: {movie?.title}</Text>
        <Text>Sessao: {session?.time} | {session?.room}</Text>
        <Text>Assentos: {seats.join(', ')}</Text>
        <Text>Combos: {snacks.length ? snacks.map(item => `${item.quantity}x ${item.name}`).join(', ') : 'Nenhum'}</Text>
        <Text style={{ fontSize: 22, fontWeight: '900', color: '#111827' }}>Total: {formatCurrency(total)}</Text>
      </View>

      <Text style={{ fontSize: 20, fontWeight: '900', color: '#111827' }}>Forma de pagamento</Text>
      {paymentOptions.map(option => (
        <Pressable
          key={option.value}
          onPress={() => setPaymentMethod(option.value)}
          style={{
            padding: 14,
            borderRadius: 8,
            backgroundColor: paymentMethod === option.value ? '#DBEAFE' : '#fff',
            borderWidth: 1,
            borderColor: paymentMethod === option.value ? '#2563EB' : '#E5E7EB',
          }}
        >
          <Text style={{ fontWeight: '800', color: '#111827' }}>{option.label}</Text>
        </Pressable>
      ))}

      <Button title="Pagar e emitir comprovante" loading={loading} onPress={handlePayment} />
    </ScrollView>
  );
}
