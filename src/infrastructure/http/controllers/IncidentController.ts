import { Request, Response } from 'express';
import { CreateIncident } from '../../../application/usecases/CreateIncident';
import { GetAllIncidents } from '../../../application/usecases/GetAllIncidents';
import { UpdateIncident } from '../../../application/usecases/UpdateIncident';
import { DeleteIncident } from '../../../application/usecases/DeleteIncident';
import { injectable } from 'inversify';
import { inject } from 'inversify';

@injectable()
export class IncidentController {
  constructor(
    @inject(CreateIncident) private createIncident: CreateIncident,
    @inject(CreateIncident) private getAllIncidents: GetAllIncidents,
    @inject(CreateIncident) private updateIncident: UpdateIncident,
    @inject(CreateIncident) private deleteIncident: DeleteIncident,
  ) {}

  async create(req: Request, res: Response) {
    const data = req.body;
    const incident = await this.createIncident.execute(data);
    res.status(201).json(incident);
  }

  async getAll(req: Request, res: Response) {
    const incidents = await this.getAllIncidents.execute();
    res.json(incidents);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const createdBy = req.headers['x-created-by'] as string;
      const incident = await this.updateIncident.execute(id, { title, description, createdBy});
      res.json(incident);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const incidentId = req.params.id;
    const currentUserId = req.user.id;
  
    try {
      await this.deleteIncident.execute(incidentId, currentUserId);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ error: error });
    }
  }
}