import { v4 as uuid } from 'uuid';
import { Incident } from '../../../domain/incident/models/Incident';
import { IncidentRepository } from '../../../application/incident/ports/IncidentRepository';

export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: Incident[] = [];

  async create(data: Omit<Incident, 'id'>): Promise<Incident> {
    const id = uuid(); 
    const newIncident = new Incident(id, data.title, data.description, data.priority, data.createdBy);
    
    this.incidents.push(newIncident);
    return newIncident;
  }

  async findAll(): Promise<Incident[]> {
    return this.incidents;
  }

  async update(incident: Incident): Promise<Incident> {
    const index = this.incidents.findIndex(i => i.id === incident.id);
    if (index === -1) throw new Error('Incident not found');
    this.incidents[index] = incident;
    return incident;
  }
  async findById(id: string): Promise<Incident | null> {
    return this.incidents.find(incident => incident.id === id) ?? null;
  }

  async findByTitle(title: string): Promise<Incident | null> {
    return this.incidents.find(incident => incident.title === title) ?? null;
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
