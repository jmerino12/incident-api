export interface IncidentResponse {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    created_by: string;  // Cambiado de createdBy a created_by
    created_at: string;
  }