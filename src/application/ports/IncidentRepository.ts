import { Incident } from '../../domain/models/Incident';

export interface IncidentRepository {
  create(data: Incident): Promise<Incident>;
  findAll(): Promise<Incident[]>;
  update(incident: Incident): Promise<Incident>;
  findById(id: string): Promise<Incident | null>;
  findByTitle(title: string): Promise<Incident | null>; 
  delete(id: string): Promise<void>;
}