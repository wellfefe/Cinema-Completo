import { describe, expect, it } from 'vitest';
import { createDemoUser } from '../services/userIdentityService';

describe('user identity', () => {
  it('creates different demo ids for different emails', () => {
    const firstUser = createDemoUser('cliente1@email.com');
    const secondUser = createDemoUser('cliente2@email.com');

    expect(firstUser.id).not.toBe(secondUser.id);
    expect(firstUser.email).toBe('cliente1@email.com');
    expect(secondUser.email).toBe('cliente2@email.com');
  });
});
