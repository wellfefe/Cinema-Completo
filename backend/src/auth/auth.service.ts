import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

type DemoUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailService) {}

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
    const normalizedEmail = input.email.trim().toLowerCase();

    if (this.users.has(normalizedEmail)) {
      throw new BadRequestException('Ja existe uma conta vinculada a esse e-mail.');
    }

    const user: DemoUser = {
      id: `user-${Date.now()}`,
      name: input.name,
      email: normalizedEmail,
      phone: input.phone,
      password: input.password,
    };

    this.users.set(user.email, user);
    return this.buildAuthResponse(user);
  }

  async forgotPassword(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const recoveryCode = this.createRecoveryCode(normalizedEmail);
    const recoveryLink = `cinema://reset-password?email=${encodeURIComponent(
      normalizedEmail,
    )}&code=${recoveryCode}`;

    await this.mailService.sendPasswordRecoveryEmail({
      to: normalizedEmail,
      recoveryCode,
      recoveryLink,
    });

    return {
      message: `Enviamos as instrucoes de recuperacao para ${normalizedEmail}. Verifique sua caixa de entrada.`,
      recoveryCode,
      recoveryLink,
    };
  }

  findAllUsers() {
    return Array.from(this.users.values()).map(({ password, ...user }) => user);
  }

  resetPassword(input: ResetPasswordDto) {
    const normalizedEmail = input.email.trim().toLowerCase();
    const expectedCode = this.createRecoveryCode(normalizedEmail);

    if (input.code.trim() !== expectedCode) {
      throw new BadRequestException('Codigo de recuperacao invalido.');
    }

    const existingUser = this.users.get(normalizedEmail);

    if (existingUser && existingUser.password === input.newPassword) {
      throw new BadRequestException('A nova senha nao pode ser igual a senha anterior.');
    }

    const user: DemoUser = existingUser ?? {
      id: `user-${Date.now()}`,
      name: normalizedEmail.split('@')[0] || 'Cliente',
      email: normalizedEmail,
      password: input.newPassword,
    };

    user.password = input.newPassword;
    this.users.set(normalizedEmail, user);

    return {
      message: 'Senha redefinida com sucesso. Entre usando sua nova senha.',
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

  private createRecoveryCode(email: string) {
    const digest = createHmac('sha256', process.env.JWT_SECRET ?? 'cinema-dev-secret')
      .update(email)
      .digest('hex');

    return String(Number.parseInt(digest.slice(0, 8), 16) % 1_000_000).padStart(6, '0');
  }
}
