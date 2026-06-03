export function getRegisterErrorMessage(error: unknown) {
  const responseMessage = (error as { response?: { data?: { message?: string } } }).response?.data
    ?.message;

  if (responseMessage === 'Ja existe uma conta vinculada a esse e-mail.') {
    return responseMessage;
  }

  return 'Nao foi possivel criar sua conta.';
}
