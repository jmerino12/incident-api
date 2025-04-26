import { injectable, inject } from 'inversify';
import { IncidentRepository } from '../ports/IncidentRepository';
import { Incident } from '../../../domain/incident/models/Incident';
import { IncidentPriorityService } from '../../../domain/incident/services/IncidentPriorityService';
import { HttpError } from '../../../domain/shared/errors/HttpError';
import { EventPublisher } from '../ports/IncidentEventPublisher';
import { DomainEvent } from '../../../domain/shared/DomainEvent';

@injectable()
export class CreateIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository,
    @inject('EventPublisher') private eventPublisher: EventPublisher
  ) {}

  async execute(data: { title: string; description: string, createdBy: string }) {
    const exists = await this.incidentRepository.findByTitle(data.title);
    if (exists) throw new HttpError('Incident with this title already exists', 400);

    const priority = IncidentPriorityService.calculate(data.title, data.description);
    const incident = new Incident('', data.title, data.description, priority, data.createdBy);

    const createdIncident = await this.incidentRepository.create(incident);

    const event: DomainEvent = {
      type: 'incident_created',
      payload: { id: incident.id, title: incident.title },
      occurredAt: new Date(),
    };

    await this.eventPublisher.publish(event);
    return createdIncident;
  }
}