import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

type DemoUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
};

@Injectable()
export class AuthService {
  private readonly users = new Map<string, DemoUser>([
    [
      'aluno@cinema.com',
      {
        id: 'demo-user',
        name: 'Aluno Cinema',
        email: 'aluno@cinema.com',
        phone: '(11) 99999-9999',
        password: '123456',
      },
    ],
  ]);

  login(input: LoginDto) {
    const user = this.users.get(input.email);

    if (!user || user.password !== input.password) {
      throw new UnauthorizedException('E-mail ou senha invalidos.');
    }

    return this.buildAuthResponse(user);
  }

  register(input: RegisterDto) {
    const user: DemoUser = {
      id: `user-${Date.now()}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      password: input.password,
    };

    this.users.set(user.email, user);
    return this.buildAuthResponse(user);
  }

  forgotPassword(email: string) {
    return {
      message: `Se ${email} estiver cadastrado, enviaremos as instrucoes de recuperacao.`,
    };
  }

  me(authorization?: string) {
    const token = authorization?.replace('Bearer ', '');
    const payload = token ? this.decodeToken(token) : null;

    if (!payload?.email) {
      throw new UnauthorizedException('Token invalido.');
    }

    const user = this.users.get(payload.email);

    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado.');
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }

  refresh(authorization?: string) {
    return {
      accessToken: this.createToken({ email: 'aluno@cinema.com', type: 'access' }),
      refreshToken: authorization?.replace('Bearer ', '') ?? this.createToken({ type: 'refresh' }),
    };
  }

  private buildAuthResponse(user: DemoUser) {
    const { password, ...safeUser } = user;

    return {
      accessToken: this.createToken({ sub: user.id, email: user.email, type: 'access' }),
      refreshToken: this.createToken({ sub: user.id, email: user.email, type: 'refresh' }),
      user: safeUser,
    };
  }

  private createToken(payload: Record<string, unknown>) {
    const header = this.base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = this.base64Url(
      JSON.stringify({
        ...payload,
        iat: Math.floor(Date.now() / 1000),
      }),
    );
    const signature = this.sign(`${header}.${body}`);

    return `${header}.${body}.${signature}`;
  }

  private decodeToken(token: string) {
    const [header, body, signature] = token.split('.');

    if (!header || !body || !signature || this.sign(`${header}.${body}`) !== signature) {
      return null;
    }

    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as { email?: string };
  }

  private sign(value: string) {
    return createHmac('sha256', process.env.JWT_SECRET ?? 'cinema-dev-secret')
      .update(value)
      .digest('base64url');
  }

  private base64Url(value: string) {
    return Buffer.from(value).toString('base64url');
  }
}
