import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import nodemailer from 'nodemailer';

type SendPasswordRecoveryEmailInput = {
  to: string;
  recoveryCode: string;
  recoveryLink: string;
};

@Injectable()
export class MailService {
  private hasSmtpConfig() {
    return Boolean(
      process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS,
    );
  }

  async sendPasswordRecoveryEmail({
    to,
    recoveryCode,
    recoveryLink,
  }: SendPasswordRecoveryEmailInput) {
    if (!this.hasSmtpConfig()) {
      throw new ServiceUnavailableException(
        'SMTP nao configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e SMTP_FROM no backend/.env.',
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to,
      subject: 'Recuperacao de senha - Cinema',
      text: [
        'Voce solicitou a recuperacao de senha do Cinema.',
        '',
        `Codigo de recuperacao: ${recoveryCode}`,
        `Link de recuperacao: ${recoveryLink}`,
        '',
        'Se voce nao solicitou isso, ignore este e-mail.',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Recuperacao de senha - Cinema</h2>
          <p>Voce solicitou a recuperacao de senha do Cinema.</p>
          <p><strong>Codigo de recuperacao:</strong></p>
          <p style="font-size: 24px; font-weight: bold;">${recoveryCode}</p>
          <p><strong>Link de recuperacao:</strong></p>
          <p><a href="${recoveryLink}">${recoveryLink}</a></p>
          <p>Se voce nao solicitou isso, ignore este e-mail.</p>
        </div>
      `,
    });
  }
}
