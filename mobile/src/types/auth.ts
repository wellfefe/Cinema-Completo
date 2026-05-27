export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};
