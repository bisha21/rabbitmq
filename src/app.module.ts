import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';
import { EventEmitterService } from './common/rmq/rmq-client.provider';

@Module({
  imports: [OrderModule, MailModule, PaymentModule],
  providers: [EventEmitterService],
})
export class AppModule {}
