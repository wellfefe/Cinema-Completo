import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: '#111827', fontWeight: '700' }}>{label}</Text>
      <TextInput
        placeholderTextColor="#6B7280"
        style={{
          minHeight: 48,
          borderWidth: 1,
          borderColor: error ? '#DC2626' : '#D1D5DB',
          borderRadius: 8,
          paddingHorizontal: 12,
          color: '#111827',
          backgroundColor: '#fff',
        }}
        {...props}
      />
      {error ? <Text style={{ color: '#DC2626' }}>{error}</Text> : null}
    </View>
  );
}
