import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { useSessions } from '../hooks/useSessions';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { PrivateStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Sessions'>;

export function SessionsScreen({ route, navigation }: Props) {
  const { movie } = route.params;
  const { data: sessions, isLoading } = useSessions(movie.id);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#F3F4F6' }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={sessions ?? []}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827', marginBottom: 4 }}>
          Sessoes de {movie.title}
        </Text>
      }
      renderItem={({ item }) => (
        <View style={{ padding: 14, gap: 8, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
            {formatDate(item.date)} as {item.time}
          </Text>
          <Text style={{ color: '#374151' }}>{item.room} | {item.exhibitionType} | {item.language}</Text>
          <Text style={{ color: '#374151' }}>Assentos disponiveis: {item.availableSeats}</Text>
          <Text style={{ color: '#111827', fontWeight: '800' }}>{formatCurrency(item.basePrice)}</Text>
          <Button title="Escolher assentos" onPress={() => navigation.navigate('SeatSelection', { movie, session: item })} />
        </View>
      )}
    />
  );
}
