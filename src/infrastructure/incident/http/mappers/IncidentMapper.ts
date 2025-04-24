import { Incident } from "../../../../domain/incident/models/Incident";
import { UserResponse } from "../../../user/http/dtos/UserResponse";
import { IncidentResponse } from "../dtos/IncidentResponse";

export class IncidentMapper {
  static toResponseDTO(incident: Incident, user: UserResponse | null = null): IncidentResponse | Omit<IncidentResponse, 'user'> {
    const base = {
      id: incident.id,
      title: incident.title,
      description: incident.description,
      priority: incident.priority,
      created_by: incident.createdBy,
      created_at: new Date().toISOString(),
    };

    return user
      ? { ...base, user }
      : base; 
  }
}
