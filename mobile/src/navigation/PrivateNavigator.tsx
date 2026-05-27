import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen';
import { MoviesScreen } from '../screens/MoviesScreen';
import { MyTicketsScreen } from '../screens/MyTicketsScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { ReceiptScreen } from '../screens/ReceiptScreen';
import { SeatSelectionScreen } from '../screens/SeatSelectionScreen';
import { SessionsScreen } from '../screens/SessionsScreen';
import { SnackComboScreen } from '../screens/SnackComboScreen';
import { PrivateStackParamList, TabParamList } from '../types/navigation';
import { useSync } from '../hooks/useSync';

const Stack = createNativeStackNavigator<PrivateStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} options={{ title: 'Filmes' }} />
      <Tab.Screen name="MyTickets" component={MyTicketsScreen} options={{ title: 'Meus ingressos' }} />
    </Tab.Navigator>
  );
}

export function PrivateNavigator() {
  useSync();

  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: '800' } }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Detalhes' }} />
      <Stack.Screen name="Sessions" component={SessionsScreen} options={{ title: 'Sessoes' }} />
      <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} options={{ title: 'Assentos' }} />
      <Stack.Screen name="SnackCombo" component={SnackComboScreen} options={{ title: 'Combos' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Pagamento' }} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'Comprovante' }} />
    </Stack.Navigator>
  );
}
