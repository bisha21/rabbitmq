import { Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EVENTS } from 'src/common/constant/event.constant';

@Controller('payment')
export class PaymentController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'payment_queue',
        queueOptions: { durable: true },
      },
    });
  }
  @Post()
  paymentSuccess() {
    const payment = {
      orderId: 'ORD-1',
      amount: 500,
      email: 'bishaltimilsina447@gmail.com',
    };

    this.client.emit(EVENTS.PAYMENT_SUCCESS, payment);

    return { message: 'Payment successful' };
  }
}
