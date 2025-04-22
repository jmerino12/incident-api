import { injectable, inject } from "inversify";
import { IncidentRepository } from "../ports/IncidentRepository";
import { Incident } from "../../../domain/incident/models/Incident";
import { IncidentPriorityService } from "../../../domain/incident/services/IncidentPriorityService";

@injectable()
export class UpdateIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) { }
  
    async execute(id: string, data: { title: string; description: string, createdBy: number }): Promise<Incident> {
      const existing = await this.incidentRepository.findById(id);
      if (!existing) throw new Error('Incident not found');
  
      const newPriority = IncidentPriorityService.calculate(data.title, data.description);
  
      const updated = new Incident(id, data.title, data.description, newPriority, data.createdBy);
  
      return this.incidentRepository.update(updated);
    }
  }