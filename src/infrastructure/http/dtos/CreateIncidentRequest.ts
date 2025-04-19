export interface CreateIncidentRequest {
    title: string;
    description: string;
    createdBy: string;
    severity: 'low' | 'medium' | 'high';
  }