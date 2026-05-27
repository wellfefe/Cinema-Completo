import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading';
import { AuthNavigator } from './AuthNavigator';
import { PrivateNavigator } from './PrivateNavigator';

export function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <NavigationContainer>
      {user ? <PrivateNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
