import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { SeatMap } from '../components/SeatMap';
import { toggleSeatSelection } from '../services/seatService';
import { usePurchaseStore } from '../store/purchaseStore';
import { PrivateStackParamList } from '../types/navigation';
import { formatCurrency } from '../utils/formatCurrency';

type Props = NativeStackScreenProps<PrivateStackParamList, 'SeatSelection'>;

export function SeatSelectionScreen({ route, navigation }: Props) {
  const { movie, session } = route.params;
  const { seats, setSeats, setMovieAndSession } = usePurchaseStore();
  const total = seats.length * session.basePrice;

  function handleToggleSeat(seat: string) {
    setMovieAndSession(movie, session);
    setSeats(toggleSeatSelection(seats, seat, session.occupiedSeats));
  }

  function handleNext() {
    setMovieAndSession(movie, session);
    navigation.navigate('SnackCombo');
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ padding: 16, gap: 18 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>{movie.title}</Text>
        <Text style={{ color: '#374151' }}>
          {session.room} | {session.time} | {formatCurrency(session.basePrice)} por ingresso
        </Text>
      </View>

      <SeatMap
        occupiedSeats={session.occupiedSeats}
        selectedSeats={seats}
        onToggleSeat={handleToggleSeat}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Azul: livre</Text>
        <Text>Cinza: ocupado</Text>
        <Text>Laranja: selecionado</Text>
      </View>

      <View style={{ padding: 14, borderRadius: 8, backgroundColor: '#fff', gap: 6 }}>
        <Text style={{ color: '#111827', fontWeight: '800' }}>Assentos: {seats.join(', ') || 'nenhum'}</Text>
        <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20 }}>
          Total ingressos: {formatCurrency(total)}
        </Text>
      </View>

      <Button title="Avancar para combos" disabled={seats.length === 0} onPress={handleNext} />
    </ScrollView>
  );
}
