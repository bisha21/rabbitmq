import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { EventEmitterService } from 'src/common/rmq/rmq-client.provider';

@Module({
  controllers: [OrderController],
  providers: [EventEmitterService],
})
export class OrderModule {}
