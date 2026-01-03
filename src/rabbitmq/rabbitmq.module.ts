// src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'NEST_MICROSERVICE_CLIENT',
  //       transport: Transport.RMQ,
  //       options: {
  //         urls: ['amqp://admin:admin123@localhost:5672'],
  //         queue: 'events_queue',
  //         queueOptions: { durable: true },
  //       },
  //     },
  //   ]),
  // ],
  // exports: [ClientsModule], // important so other modules can use it
})
export class RabbitMQModule {}
