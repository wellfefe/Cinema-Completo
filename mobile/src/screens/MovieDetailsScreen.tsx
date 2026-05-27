import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { PrivateStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<PrivateStackParamList, 'MovieDetails'>;

export function MovieDetailsScreen({ route, navigation }: Props) {
  const { movie } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Image
        source={{ uri: movie.posterUrl }}
        style={{ width: '100%', height: 430, borderRadius: 8, backgroundColor: '#E5E7EB' }}
        resizeMode="cover"
      />
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: '900', color: '#111827' }}>{movie.title}</Text>
        <Text style={{ color: '#374151', fontWeight: '700' }}>
          {movie.genre} | {movie.rating} | {movie.durationMinutes} min
        </Text>
        {movie.cast ? <Text style={{ color: '#4B5563' }}>Elenco: {movie.cast}</Text> : null}
        <Text style={{ color: '#111827', lineHeight: 22 }}>{movie.synopsis}</Text>
      </View>
      <Button title="Ver sessoes" onPress={() => navigation.navigate('Sessions', { movie })} />
    </ScrollView>
  );
}
