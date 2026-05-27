import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getSnacksApi } from '../api/snacks.api';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { calculatePurchaseTotal } from '../services/ticketService';
import { usePurchaseStore } from '../store/purchaseStore';
import { SnackCombo, SnackSelection } from '../types/snack';
import { formatCurrency } from '../utils/formatCurrency';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../types/navigation';

type Navigation = NativeStackNavigationProp<PrivateStackParamList>;

export function SnackComboScreen() {
  const navigation = useNavigation<Navigation>();
  const { data: snacks, isLoading } = useQuery({ queryKey: ['snacks'], queryFn: getSnacksApi });
  const { session, seats, snacks: selectedSnacks, setSnacks } = usePurchaseStore();

  const total = useMemo(() => {
    if (!session) return 0;
    return calculatePurchaseTotal({
      seatCount: seats.length,
      ticketPrice: session.basePrice,
      snacks: selectedSnacks,
    });
  }, [seats.length, selectedSnacks, session]);

  function changeQuantity(combo: SnackCombo, delta: number) {
    const current = selectedSnacks.find(item => item.id === combo.id);
    const nextQuantity = Math.max(0, (current?.quantity ?? 0) + delta);
    const withoutCombo = selectedSnacks.filter(item => item.id !== combo.id);
    const nextSelection: SnackSelection[] =
      nextQuantity > 0 ? [...withoutCombo, { ...combo, quantity: nextQuantity }] : withoutCombo;

    setSnacks(nextSelection);
  }

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <FlatList
        data={snacks ?? []}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 120 }}
        ListHeaderComponent={
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Combos de lanches</Text>
        }
        renderItem={({ item }) => {
          const quantity = selectedSnacks.find(snack => snack.id === item.id)?.quantity ?? 0;

          return (
            <View style={{ padding: 14, gap: 8, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>{item.name}</Text>
              <Text style={{ color: '#4B5563' }}>{item.description}</Text>
              <Text style={{ color: '#111827', fontWeight: '800' }}>{formatCurrency(item.price)}</Text>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Button title="-" variant="secondary" onPress={() => changeQuantity(item, -1)} style={{ width: 56 }} />
                <Text style={{ fontSize: 18, fontWeight: '900' }}>{quantity}</Text>
                <Button title="+" onPress={() => changeQuantity(item, 1)} style={{ width: 56 }} />
              </View>
            </View>
          );
        }}
      />

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, gap: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E5E7EB' }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: '#111827' }}>Total: {formatCurrency(total)}</Text>
        <Button title="Ir para pagamento" onPress={() => navigation.navigate('Payment')} />
      </View>
    </View>
  );
}
