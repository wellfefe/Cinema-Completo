import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { AuthStackParamList } from '../types/navigation';
import { RegisterInput } from '../types/auth';
import { validateRegisterForm } from '../services/validationService';
import { getRegisterErrorMessage } from '../services/registerErrorService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [form, setForm] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof RegisterInput, value: string) {
    setRegisterError('');
    setForm(current => ({ ...current, [field]: value }));
  }

  async function handleRegister() {
    setRegisterError('');
    const validation = validateRegisterForm(form);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      await signUp(form);
    } catch (error) {
      const message = getRegisterErrorMessage(error);
      setRegisterError(message);
      Alert.alert('Cadastro', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 16, backgroundColor: '#F3F4F6' }}>
      <Text style={{ fontSize: 28, fontWeight: '900', color: '#111827' }}>Criar conta</Text>
      <Input label="Nome completo" value={form.name} error={errors.name} onChangeText={value => updateField('name', value)} />
      <Input label="E-mail" value={form.email} error={errors.email} autoCapitalize="none" keyboardType="email-address" onChangeText={value => updateField('email', value)} />
      <Input label="Telefone" value={form.phone} keyboardType="phone-pad" onChangeText={value => updateField('phone', value)} />
      <Input label="Senha" value={form.password} error={errors.password} secureTextEntry onChangeText={value => updateField('password', value)} />
      <Input label="Confirmar senha" value={form.confirmPassword} error={errors.confirmPassword} secureTextEntry onChangeText={value => updateField('confirmPassword', value)} />
      {registerError ? (
        <View style={{ padding: 14, borderRadius: 8, backgroundColor: '#FEE2E2' }}>
          <Text style={{ color: '#991B1B', fontWeight: '800' }}>{registerError}</Text>
        </View>
      ) : null}
      <Button title="Cadastrar" loading={loading} onPress={handleRegister} />
      <View>
        <Button title="Voltar para login" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}
