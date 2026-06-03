import { describe, expect, it } from 'vitest';
import { buildPasswordRecoveryResponse } from '../services/passwordRecoveryService';

describe('password recovery', () => {
  it('returns a clear recovery code and simulated link', () => {
    const response = buildPasswordRecoveryResponse('Aluno@Cinema.com');

    expect(response.recoveryCode).toMatch(/^\d{6}$/);
    expect(response.recoveryLink).toContain('cinema://reset-password');
    expect(response.recoveryLink).toContain('aluno%40cinema.com');
    expect(response.message).toContain('aluno@cinema.com');
  });
});
