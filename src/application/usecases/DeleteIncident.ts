import { inject, injectable } from "inversify";
import { IncidentRepository } from "../ports/IncidentRepository";
import { HttpError } from "../../domain/errors/HttpError";

@injectable()
export class DeleteIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) { }

  async execute(incidentId: string, currentUserId: string): Promise<void> {
    const incident = await this.incidentRepository.findById(incidentId);

    if (!incident) {
      throw new HttpError('Incident not found', 404);
    }

    if (incident.createdBy !== currentUserId) {
      throw new HttpError('Unauthorized to delete this incident', 403);
    }

    await this.incidentRepository.delete(incidentId);
  }
}