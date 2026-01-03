import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'order_queue',
        queueOptions: { durable: true },
      },
    });
  }

  @Post()
  createOrder(@Body() body: { email: string }) {
    const order = {
      orderId: 'ORD-' + Date.now(),
      email: body.email,
    };

    console.log('Emitting order.created event:', order);

    // 🔹 send() emits the message
    this.client.send('order.created', order).subscribe({
      next: (res) => console.log('Message sent successfully', res),
      error: (err) => console.error('Error sending message', err),
    });

    return {
      message: 'Order created and message sent',
      orderId: order.orderId,
    };
  }
}
