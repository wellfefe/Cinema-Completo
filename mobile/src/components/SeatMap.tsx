import { Pressable, Text, View } from 'react-native';

type SeatMapProps = {
  occupiedSeats: string[];
  selectedSeats: string[];
  onToggleSeat: (seat: string) => void;
};

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const columns = [1, 2, 3, 4, 5, 6, 7, 8];

export function SeatMap({ occupiedSeats, selectedSeats, onToggleSeat }: SeatMapProps) {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          height: 28,
          borderRadius: 999,
          backgroundColor: '#111827',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '800' }}>TELA</Text>
      </View>

      {rows.map(row => (
        <View key={row} style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          {columns.map(column => {
            const seat = `${row}${column}`;
            const occupied = occupiedSeats.includes(seat);
            const selected = selectedSeats.includes(seat);

            return (
              <Pressable
                key={seat}
                disabled={occupied}
                onPress={() => onToggleSeat(seat)}
                style={{
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  backgroundColor: occupied ? '#6B7280' : selected ? '#F59E0B' : '#2563EB',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '800' }}>{seat}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
