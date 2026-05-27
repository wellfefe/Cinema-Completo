import { Image, Text, View } from 'react-native';
import { Movie } from '../types/movie';
import { Button } from './Button';

type MovieCardProps = {
  movie: Movie;
  onDetails: () => void;
  onSessions: () => void;
};

export function MovieCard({ movie, onDetails, onSessions }: MovieCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <Image
        source={{ uri: movie.posterUrl }}
        style={{ width: 96, height: 140, borderRadius: 6, backgroundColor: '#E5E7EB' }}
      />
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>{movie.title}</Text>
        <Text style={{ color: '#4B5563' }} numberOfLines={3}>
          {movie.shortSynopsis}
        </Text>
        <Text style={{ color: '#111827', fontWeight: '700' }}>
          {movie.genre} | {movie.rating} | {movie.durationMinutes} min
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          <Button title="Detalhes" variant="secondary" onPress={onDetails} style={{ flex: 1 }} />
          <Button title="Sessoes" onPress={onSessions} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}
