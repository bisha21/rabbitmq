import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Connect microservice to a single queue
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin123@localhost:5672'],
      queue: 'main_queue', // only one queue for all events
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  console.log(' RabbitMQ microservice connected');

  await app.listen(3000);
  console.log(' HTTP server running on http://localhost:3000');
}

bootstrap();
