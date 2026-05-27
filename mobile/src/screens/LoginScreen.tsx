import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('aluno@cinema.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Login', error instanceof Error ? error.message : 'Nao foi possivel entrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F3F4F6' }}
    >
      <View style={{ gap: 18 }}>
        <View>
          <Text style={{ fontSize: 32, fontWeight: '900', color: '#111827' }}>Cinema App</Text>
          <Text style={{ color: '#4B5563', marginTop: 6 }}>
            Entre para comprar ingressos e consultar seus comprovantes offline.
          </Text>
        </View>

        <Input
          label="E-mail"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Input label="Senha" value={password} secureTextEntry onChangeText={setPassword} />

        <Button title="Entrar" loading={loading} onPress={handleLogin} />
        <Button
          title="Criar conta"
          variant="secondary"
          onPress={() => navigation.navigate('Register')}
        />
        <Button
          title="Recuperar senha"
          variant="secondary"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
