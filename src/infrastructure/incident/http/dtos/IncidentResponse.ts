import { UserResponse } from "../../../user/http/dtos/UserResponse";

export interface IncidentResponse {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    created_by: string; 
    created_at: string;
    user: UserResponse | null;
  }