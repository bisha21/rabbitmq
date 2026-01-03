import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { EventEmitterService } from 'src/common/rmq/rmq-client.provider';

@Module({
  imports: [RabbitMQModule],
  controllers: [PaymentController],
  providers: [EventEmitterService],
})
export class PaymentModule {}
