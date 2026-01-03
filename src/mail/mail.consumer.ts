import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailConsumer {
  constructor(private readonly mailService: MailService) {
    console.log('MailConsumer initialized');
  }

  @EventPattern('order.created')
  async handleOrderCreated(
    @Payload() data: { email: string; orderId: string },
  ) {
    console.log('EVENT TRIGGERED SUCCESSFULLY!');
    console.log('Received order.created event:', data);

    try {
      await this.mailService.sendMail({
        email: data.email, // recipient
        subject: `Your Order ${data.orderId} is Confirmed!`,
        html: `<h1>Thank you for your order!</h1>
               <p>Your order <strong>${data.orderId}</strong> has been received and is being processed.</p>`,
        message: `Your order ${data.orderId} has been received and is being processed.`,
      });

      console.log(`Confirmation email sent to ${data.email}`);
    } catch (err) {
      console.error('Failed to send confirmation email', err);
    }
  }

  @EventPattern('payment.success')
  async handlePaymentSuccess(
    @Payload() data: { email: string; paymentId: string; amount: number },
  ) {
    console.log('PAYMENT SUCCESS EVENT TRIGGERED!', data.email);

    console.log('Received payment.success event:', data);

    try {
      await this.mailService.sendMail({
        email: data.email, // recipient
        subject: `Payment Successful - ${data.paymentId}`,
        html: `<h1>Payment Received!</h1>
               <p>Payment <strong>${data.paymentId}</strong> of <strong>$${data.amount}</strong> has been successfully processed.</p>`,
        message: `Your payment ${data.paymentId} of $${data.amount} has been successfully processed.`,
      });

      console.log(`Payment confirmation email sent to ${data.email}`);
    } catch (err) {
      console.error(' Failed to send payment email', err);
    }
  }
}
