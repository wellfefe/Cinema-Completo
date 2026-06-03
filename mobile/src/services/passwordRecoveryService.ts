export type PasswordRecoveryResponse = {
  message: string;
  recoveryCode: string;
  recoveryLink: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createRecoveryCode(email: string) {
  let hash = 0;
  const normalizedEmail = normalizeEmail(email);

  for (let index = 0; index < normalizedEmail.length; index += 1) {
    hash = (hash * 33 + normalizedEmail.charCodeAt(index)) >>> 0;
  }

  return String(hash % 1_000_000).padStart(6, '0');
}

export function buildPasswordRecoveryResponse(email: string): PasswordRecoveryResponse {
  const normalizedEmail = normalizeEmail(email);
  const recoveryCode = createRecoveryCode(normalizedEmail);

  return {
    message: `Enviamos as instrucoes de recuperacao para ${normalizedEmail}. Para a apresentacao, use o codigo abaixo.`,
    recoveryCode,
    recoveryLink: `cinema://reset-password?email=${encodeURIComponent(
      normalizedEmail,
    )}&code=${recoveryCode}`,
  };
}
