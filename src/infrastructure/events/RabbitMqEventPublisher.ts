import { inject, injectable } from 'inversify';
import { RabbitMQConnection } from '../server/RabbitMQConnection';
import { EventPublisher } from '../../application/incident/ports/IncidentEventPublisher';
import { DomainEvent } from '../../domain/shared/DomainEvent';

@injectable()
export class RabbitMqEventPublisher implements EventPublisher {
  constructor(
    @inject(RabbitMQConnection) private readonly rabbitMQ: RabbitMQConnection
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    const channel = this.rabbitMQ.getChannel();
    const queue = event.type;

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)));
  }
}
