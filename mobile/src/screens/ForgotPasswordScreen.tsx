import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { forgotPasswordApi, resetPasswordApi } from '../api/auth.api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PasswordRecoveryResponse } from '../services/passwordRecoveryService';
import { getResetPasswordErrorMessage } from '../services/resetPasswordErrorService';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [recovery, setRecovery] = useState<PasswordRecoveryResponse | null>(null);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resendSeconds, setResendSeconds] = useState(0);

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setTimeout(() => {
      setResendSeconds(current => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendSeconds]);

  async function handleSubmit() {
    if (!email.includes('@')) {
      Alert.alert('Recuperacao', 'Informe um e-mail valido.');
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPasswordApi(email);
      setRecovery(response);
      setResetError('');
      setResendSeconds(45);
    } catch (error) {
      Alert.alert(
        'Recuperacao',
        'Nao foi possivel enviar o e-mail. Verifique se o SMTP esta configurado no backend.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email.includes('@')) {
      Alert.alert('Redefinir senha', 'Informe o mesmo e-mail usado na recuperacao.');
      return;
    }

    if (!code.trim()) {
      Alert.alert('Redefinir senha', 'Informe o codigo recebido por e-mail.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Redefinir senha', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Redefinir senha', 'As senhas nao conferem.');
      return;
    }

    try {
      setResetLoading(true);
      setResetError('');
      const response = await resetPasswordApi({
        email,
        code,
        newPassword,
      });

      Alert.alert('Redefinir senha', response.message);
      navigation.goBack();
    } catch (error) {
      setResetError(getResetPasswordErrorMessage(error));
    } finally {
      setResetLoading(false);
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

      {recovery ? (
        <>
          <View style={{ padding: 14, borderRadius: 8, backgroundColor: '#DBEAFE', gap: 8 }}>
            <Text style={{ color: '#111827', fontWeight: '800' }}>E-mail enviado</Text>
            <Text style={{ color: '#1F2937' }}>
              Enviamos um codigo para {email}. Abra seu e-mail, copie o codigo e use a caixa abaixo para redefinir sua senha.
            </Text>
          </View>

          <View style={{ padding: 14, borderRadius: 8, backgroundColor: '#fff', gap: 12, borderWidth: 1, borderColor: '#D1D5DB' }}>
            <Text style={{ color: '#111827', fontWeight: '900', fontSize: 18 }}>
              Ja tenho o codigo
            </Text>
            <Text style={{ color: '#4B5563' }}>
              Cole o codigo recebido por e-mail e escolha uma nova senha.
            </Text>
            <Input label="Codigo" value={code} keyboardType="number-pad" onChangeText={setCode} />
            <Input label="Nova senha" value={newPassword} secureTextEntry onChangeText={setNewPassword} />
            <Input label="Confirmar nova senha" value={confirmPassword} secureTextEntry onChangeText={setConfirmPassword} />
            {resetError ? (
              <Text style={{ color: '#DC2626', fontWeight: '800' }}>{resetError}</Text>
            ) : null}
            <Button title="Redefinir senha" loading={resetLoading} onPress={handleResetPassword} />
            <Button
              title={
                resendSeconds > 0
                  ? `Nao recebi o codigo (${resendSeconds}s)`
                  : 'Nao recebi o codigo, enviar novamente'
              }
              variant="secondary"
              disabled={resendSeconds > 0}
              loading={loading}
              onPress={handleSubmit}
            />
          </View>
        </>
      ) : null}

      <Button title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}
