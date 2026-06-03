export function getResetPasswordErrorMessage(error: unknown) {
  const responseMessage = (error as { response?: { data?: { message?: string } } }).response?.data
    ?.message;

  if (responseMessage === 'A nova senha nao pode ser igual a senha anterior.') {
    return responseMessage;
  }

  if (responseMessage === 'Codigo de recuperacao invalido.') {
    return 'Codigo incorreto. Digite o codigo correto.';
  }

  return 'Nao foi possivel redefinir a senha. Tente novamente.';
}
