import { IncidentRepository } from '../../application/ports/IncidentRepository';
import { Incident } from '../../domain/models/Incident';
import { v4 as uuid } from 'uuid';

export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: Incident[] = [];

  async create(data: Omit<Incident, 'id'>): Promise<Incident> {
    const newIncident: Incident = {
      id: uuid(),
      ...data,
    };
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
