import { injectable, inject } from 'inversify';
import { IncidentRepository } from '../ports/IncidentRepository';
import { Incident } from '../../../domain/incident/models/Incident';
import { IncidentPriorityService } from '../../../domain/incident/services/IncidentPriorityService';
import { HttpError } from '../../../domain/shared/errors/HttpError';

@injectable()
export class CreateIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) {}

  async execute(data: { title: string; description: string, createdBy: string }) {
    const exists = await this.incidentRepository.findByTitle(data.title);
    if (exists) throw new HttpError('Incident with this title already exists', 400);

    const priority = IncidentPriorityService.calculate(data.title, data.description);
    const incident = new Incident('', data.title, data.description, priority, data.createdBy);

    return await this.incidentRepository.create(incident);
  }
}