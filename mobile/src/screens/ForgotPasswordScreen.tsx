import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { forgotPasswordApi } from '../api/auth.api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.includes('@')) {
      Alert.alert('Recuperacao', 'Informe um e-mail valido.');
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPasswordApi(email);
      Alert.alert('Recuperacao', response.message);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16, backgroundColor: '#F3F4F6' }}>
      <Text style={{ fontSize: 28, fontWeight: '900', color: '#111827' }}>Recuperar senha</Text>
      <Text style={{ color: '#4B5563' }}>
        Digite seu e-mail para receber as instrucoes de recuperacao.
      </Text>
      <Input label="E-mail" value={email} autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />
      <Button title="Enviar" loading={loading} onPress={handleSubmit} />
      <Button title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}
