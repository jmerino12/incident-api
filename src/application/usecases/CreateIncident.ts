import { injectable, inject } from 'inversify';
import { Incident } from '../../domain/models/Incident';
import { IncidentPriorityService } from '../../domain/services/IncidentPriorityService';
import { IncidentRepository } from '../ports/IncidentRepository';

@injectable()
export class CreateIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) {}

  async execute(data: { title: string; description: string, createdBy: string }) {
    const exists = await this.incidentRepository.findByTitle(data.title);
    if (exists) throw new Error('Incident with this title already exists');

    const priority = IncidentPriorityService.calculate(data.title, data.description);
    const incident = new Incident('', data.title, data.description, priority, data.createdBy);

    return this.incidentRepository.create(incident);
  }
}