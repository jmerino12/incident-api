import { Request, Response } from 'express';
import { CreateIncident } from '../../../application/usecases/CreateIncident';
import { GetAllIncidents } from '../../../application/usecases/GetAllIncidents';
import { UpdateIncident } from '../../../application/usecases/UpdateIncident';
import { DeleteIncident } from '../../../application/usecases/DeleteIncident';
import { injectable } from 'inversify';
import { inject } from 'inversify';
import { CreateIncidentRequest } from '../dtos/CreateIncidentRequest';
import { IncidentResponse } from '../dtos/IncidentResponse';
import { IncidentMapper } from '../mappers/IncidentMapper';

@injectable()
export class IncidentController {
  constructor(
    @inject(CreateIncident) private createIncident: CreateIncident,
    @inject(GetAllIncidents) private getAllIncidents: GetAllIncidents,
    @inject(UpdateIncident) private updateIncident: UpdateIncident,
    @inject(DeleteIncident) private deleteIncident: DeleteIncident,
  ) {}

  async create(req: Request, res: Response) {

    const data: CreateIncidentRequest  = {
      title: req.body.title,
      description: req.body.description,
      severity: req.body.severity,
      createdBy: (req as any).user?.id || req.headers['createdby'] as string
    };

    const incident = await this.createIncident.execute(data);

    const response: IncidentResponse = IncidentMapper.toResponseDTO(incident);

    res.status(201).json(response);
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