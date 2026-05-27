import { User } from '../types/auth';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function stableHash(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

export function createDemoUser(email: string): User {
  const normalizedEmail = normalizeEmail(email);
  const nameFromEmail = normalizedEmail.split('@')[0] || 'cliente';

  return {
    id: `demo-user-${stableHash(normalizedEmail)}`,
    name: nameFromEmail,
    email: normalizedEmail,
  };
}
