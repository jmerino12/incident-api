import { User } from "../../user/models/User";
import { Incident } from "./Incident";

export class IncidentWithUser extends Incident {
    constructor(
      id: string,
      title: string,
      description: string,
      priority: 'low' | 'medium' | 'high',
      createdBy: string,
      public user: User | null = null
    ) {
      super(id, title, description, priority, createdBy);
    }
  }