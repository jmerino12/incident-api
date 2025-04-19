import { Incident } from "../../../domain/models/Incident";
import { IncidentResponse } from "../dtos/IncidentResponse";

export class IncidentMapper {
    static toResponseDTO(incident: Incident): IncidentResponse {
      return {
        id: incident.id,
        title: incident.title,
        description: incident.description,
        priority: incident.priority,
        created_by: incident.createdBy,
        created_at: new Date().toISOString(),
      };
    }
  }
  