import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
};

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}: ButtonProps) {
  const backgroundColor =
    variant === 'danger' ? '#DC2626' : variant === 'secondary' ? '#374151' : '#2563EB';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: disabled ? '#9CA3AF' : backgroundColor,
        paddingHorizontal: 16,
        opacity: loading ? 0.75 : 1,
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{title}</Text>
      )}
    </Pressable>
  );
}
