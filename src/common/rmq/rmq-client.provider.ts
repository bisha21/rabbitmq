import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class EventEmitterService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    // Initialize RMQ client once
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'main_queue',
        queueOptions: { durable: true },
      },
    });
  }

  emit(event: string, payload: any) {
    this.client.emit(event, payload);
    console.log(`Event emitted: ${event}`, payload);
  }
}
