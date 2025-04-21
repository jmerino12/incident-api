
import { injectable, inject } from 'inversify';
import { IncidentRepository } from '../ports/IncidentRepository';
import { HttpError } from '../../domain/errors/HttpError';

@injectable()
export class GetIncidentById {
    constructor(
        @inject('IncidentRepository') private incidentRepository: IncidentRepository
    ) { }

    async execute(incidentId: string) {
        const incident = await this.incidentRepository.findById(incidentId);

        if (!incident) {
            throw new HttpError('Incident not found', 404);
        }
        return incident;
    }
}