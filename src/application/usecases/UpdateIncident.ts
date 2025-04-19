import { injectable, inject } from "inversify";
import { Incident } from "../../domain/models/Incident";
import { IncidentPriorityService } from "../../domain/services/IncidentPriorityService";
import { IncidentRepository } from "../ports/IncidentRepository";

@injectable()
export class UpdateIncident {
  constructor(
    @inject('IncidentRepository') private incidentRepository: IncidentRepository
  ) { }
  
    async execute(id: string, data: { title: string; description: string, createdBy: string }): Promise<Incident> {
      const existing = await this.incidentRepository.findById(id);
      if (!existing) throw new Error('Incident not found');
  
      const newPriority = IncidentPriorityService.calculate(data.title, data.description);
  
      const updated = new Incident(id, data.title, data.description, newPriority, data.createdBy);
  
      return this.incidentRepository.update(updated);
    }
  }