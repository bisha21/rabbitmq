import { Controller, Post, Body } from '@nestjs/common';
import { EVENTS } from 'src/common/constant/event.constant';
import { EventEmitterService } from 'src/common/rmq/rmq-client.provider';

@Controller('order')
export class OrderController {
  constructor(private readonly emitter: EventEmitterService) {}

  @Post()
  createOrder(@Body() body: { email: string }) {
    const order = {
      orderId: 'ORD-' + Date.now(),
      email: body.email,
    };

    this.emitter.emit(EVENTS.ORDER_CREATED, order);

    return {
      message: 'Order created and event emitted',
      orderId: order.orderId,
    };
  }
}
