import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

export const rabbitMQClient = (): ClientProxy => {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin123@localhost:5672'],
      queue: 'events_queue',
      queueOptions: { durable: true },
    },
  });
};
