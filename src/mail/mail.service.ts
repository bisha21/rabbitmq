/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      port: parseInt(process.env.MAIL_PORT as string, 10),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(options: {
    email: string | string[];
    subject: string;
    html?: string;
    message?: string;
  }) {
    if (
      !options.email ||
      (Array.isArray(options.email) && options.email.length === 0)
    ) {
      console.error('Email is required');
      return;
    }

    const recipients = Array.isArray(options.email)
      ? options.email.join(',')
      : options.email;

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipients,
      subject: options.subject,
      html: options.html,
      text: options.message,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully: ${result.messageId}`);
      return result;
    } catch (err) {
      console.error('❌ Error sending email:', err);
      throw err;
    }
  }
}
