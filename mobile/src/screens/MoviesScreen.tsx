import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { MovieCard } from '../components/MovieCard';
import { useAuth } from '../hooks/useAuth';
import { useMovies } from '../hooks/useMovies';
import { PrivateStackParamList } from '../types/navigation';

type Navigation = NativeStackNavigationProp<PrivateStackParamList>;

export function MoviesScreen() {
  const navigation = useNavigation<Navigation>();
  const { signOut } = useAuth();
  const { data: movies, isLoading, error } = useMovies();

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <FlatList
        data={movies ?? []}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <View style={{ gap: 10, marginBottom: 4 }}>
            <Text style={{ fontSize: 26, fontWeight: '900', color: '#111827' }}>
              Filmes em cartaz
            </Text>
            <Button title="Sair da conta" variant="danger" onPress={signOut} />
            {error ? <ErrorMessage message="Usando catalogo local porque a API nao respondeu." /> : null}
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onDetails={() => navigation.navigate('MovieDetails', { movie: item })}
            onSessions={() => navigation.navigate('Sessions', { movie: item })}
          />
        )}
      />
    </View>
  );
}
