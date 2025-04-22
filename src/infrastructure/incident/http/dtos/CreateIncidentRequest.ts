export interface CreateIncidentRequest {
    title: string;
    description: string;
    createdBy: number;
    severity: 'low' | 'medium' | 'high';
  }