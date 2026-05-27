import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TicketCard } from '../components/TicketCard';
import { useAuth } from '../hooks/useAuth';
import { useTickets } from '../hooks/useTickets';
import { PrivateStackParamList } from '../types/navigation';

type Navigation = NativeStackNavigationProp<PrivateStackParamList>;

export function MyTicketsScreen() {
  const navigation = useNavigation<Navigation>();
  const { user } = useAuth();
  const { tickets, refreshTickets } = useTickets(user?.id);

  useFocusEffect(
    useCallback(() => {
      refreshTickets();
    }, [refreshTickets]),
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#F3F4F6' }}
      contentContainerStyle={{ padding: 16, gap: 12, flexGrow: 1 }}
      data={tickets}
      keyExtractor={item => item.localId}
      ListHeaderComponent={
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Meus ingressos</Text>
      }
      ListEmptyComponent={
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: '#4B5563', textAlign: 'center' }}>
            Nenhum ingresso comprado ainda. Quando voce finalizar uma compra, ela aparecera aqui mesmo offline.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TicketCard ticket={item} onPress={() => navigation.navigate('Receipt', { ticket: item })} />
      )}
    />
  );
}
