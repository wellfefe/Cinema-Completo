import { RegisterInput } from '../types/auth';

type ValidationSuccess = {
  success: true;
};

type ValidationFailure = {
  success: false;
  errors: Partial<Record<keyof RegisterInput, string>>;
};

export function validateRegisterForm(input: RegisterInput): ValidationSuccess | ValidationFailure {
  const errors: Partial<Record<keyof RegisterInput, string>> = {};

  if (!input.name.trim()) {
    errors.name = 'Nome obrigatorio.';
  }

  if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = 'E-mail invalido.';
  }

  if (input.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = 'As senhas nao conferem.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true };
}
