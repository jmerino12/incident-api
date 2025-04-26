import { injectable, inject } from 'inversify';  // Ruta del archivo correcto
import { DomainEvent } from '../../../domain/shared/DomainEvent';
import { RabbitMQConnection } from '../../server/RabbitMQConnection';

@injectable()
export class IncidentCreatedConsumer {
  constructor(
    @inject(RabbitMQConnection) private rabbitMQConnection: RabbitMQConnection
  ) {}

  async start() {
    try {
      console.log('🚀 IncidentCreatedConsumer  Conectando a RabbitMQ...');
      await this.rabbitMQConnection.connect();
      const channel = this.rabbitMQConnection.getChannel();

      const queue = 'incident_created';
      await channel.assertQueue(queue, { durable: true });

      console.log('📥 Esperando eventos de tipo incident_created...');

      channel.consume(queue, async (msg) => {
        if (msg !== null) {
          try {
            const event: DomainEvent = JSON.parse(msg.content.toString());
            console.log('📬 Evento recibido:', event);

            if (event.type === 'IncidentCreated') {
              // Aquí puedes reaccionar: enviar email, guardar log, auditar, etc.
              console.log(`✅ Procesando incidente creado: ${event.payload.title}`);
            }

            channel.ack(msg);
          } catch (error) {
            console.error('❌ Error al procesar el evento:', error);
            channel.nack(msg, false, false); // descarta el mensaje
          }
        }
      });
    } catch (error) {
      console.error('❌ Error al conectar con RabbitMQ:', error);
    }
  }
}
