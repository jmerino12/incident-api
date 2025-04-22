import { injectable, inject } from 'inversify';
import { IncidentRepository } from '../ports/IncidentRepository';

@injectable()
export class GetAllIncidents {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) { }

  async execute() {
    return this.incidentRepository.findAll();
  }
}