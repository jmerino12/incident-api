/*import { Incident } from "../models/Incident";

export class AssignmentService {
    static assign(incident: Incident, technicians: Technician[]): Technician {
      const available = technicians.filter(t => t.isAvailable);
  
      if (incident.description.includes('electricidad')) {
        return available.find(t => t.skills.includes('electricidad'))!;
      }
  
      return available[0]; // fallback
    }
  }*/