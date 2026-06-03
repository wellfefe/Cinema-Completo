import { describe, expect, it } from 'vitest';
import { getResetPasswordErrorMessage } from '../services/resetPasswordErrorService';

describe('reset password error message', () => {
  it('shows a specific message when new password is equal to the old password', () => {
    const message = getResetPasswordErrorMessage({
      response: {
        data: {
          message: 'A nova senha nao pode ser igual a senha anterior.',
        },
      },
    });

    expect(message).toBe('A nova senha nao pode ser igual a senha anterior.');
  });

  it('shows a specific message when recovery code is invalid', () => {
    const message = getResetPasswordErrorMessage({
      response: {
        data: {
          message: 'Codigo de recuperacao invalido.',
        },
      },
    });

    expect(message).toBe('Codigo incorreto. Digite o codigo correto.');
  });
});
