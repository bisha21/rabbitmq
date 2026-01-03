import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  controllers: [PaymentController],
})
export class PaymentModule {}
