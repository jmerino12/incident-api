import { inject, injectable } from "inversify";
import { IncidentRepository } from "../ports/IncidentRepository";

@injectable()
export class DeleteIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) { }

  async execute(incidentId: string, currentUserId: string): Promise<void> {
    const incident = await this.incidentRepository.findById(incidentId);

    if (!incident) {
      throw new Error('Incident not found');
    }

    if (incident.createdBy !== currentUserId) {
      throw new Error('Unauthorized to delete this incident');
    }

    await this.incidentRepository.delete(incidentId);
  }
}