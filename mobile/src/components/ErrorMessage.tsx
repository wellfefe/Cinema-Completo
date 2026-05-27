import { Text, View } from 'react-native';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <View style={{ padding: 16, borderRadius: 8, backgroundColor: '#FEE2E2' }}>
      <Text style={{ color: '#991B1B', fontWeight: '700' }}>{message}</Text>
    </View>
  );
}
