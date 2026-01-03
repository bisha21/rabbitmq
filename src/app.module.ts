import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [OrderModule, MailModule, PaymentModule],
})
export class AppModule {}
