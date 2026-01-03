import { Controller, Post } from '@nestjs/common';
import { EVENTS } from 'src/common/constant/event.constant';
import { EventEmitterService } from 'src/common/rmq/rmq-client.provider';

@Controller('payment')
export class PaymentController {
  constructor(private readonly emitter: EventEmitterService) {}

  @Post()
  paymentSuccess() {
    const payment = {
      orderId: 'ORD-1',
      amount: 500,
      email: 'bishaltimilsina447@gmail.com',
    };

    this.emitter.emit(EVENTS.PAYMENT_SUCCESS, payment);

    return { message: 'Payment successful and event emitted' };
  }
}
