import amqp, { Channel, ChannelModel } from 'amqplib';
import { injectable } from 'inversify';

@injectable()
export class RabbitMQConnection {
    private connection!: ChannelModel;
    private channel!: Channel;

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    getChannel(): Channel {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized. Did you call connect()?');
        }
        return this.channel;
    }

    async close(): Promise<void> {
        await this.channel.close();
        await this.connection.close();
    }
}
