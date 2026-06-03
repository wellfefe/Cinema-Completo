import { describe, expect, it } from 'vitest';
import { getRegisterErrorMessage } from '../services/registerErrorService';

describe('register error message', () => {
  it('shows a specific message when email is already linked to an account', () => {
    const message = getRegisterErrorMessage({
      response: {
        data: {
          message: 'Ja existe uma conta vinculada a esse e-mail.',
        },
      },
    });

    expect(message).toBe('Ja existe uma conta vinculada a esse e-mail.');
  });
});
