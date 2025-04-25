import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { CreateIncidentRequest } from '../dtos/CreateIncidentRequest';
import { IncidentResponse } from '../dtos/IncidentResponse';
import { IncidentMapper } from '../mappers/IncidentMapper';
import { CreateIncident } from '../../../../application/incident/usecases/CreateIncident';
import { GetAllIncidents } from '../../../../application/incident/usecases/GetAllIncidents';
import { GetIncidentById } from '../../../../application/incident/usecases/GetIncidentById';
import { UpdateIncident } from '../../../../application/incident/usecases/UpdateIncident';
import { DeleteIncident } from '../../../../application/incident/usecases/DeleteIncident';
import { IncidentWithUser } from '../../../../domain/incident/models/IncidentWithUser';

@injectable()
export class IncidentController {
  constructor(
    @inject(CreateIncident) private createIncident: CreateIncident,
    @inject(GetAllIncidents) private getAllIncidents: GetAllIncidents,
    @inject(GetIncidentById) private getIncidentById: GetIncidentById,
    @inject(UpdateIncident) private updateIncident: UpdateIncident,
    @inject(DeleteIncident) private deleteIncident: DeleteIncident,
  ) { }

  async create(req: Request, res: Response) {

    const data: CreateIncidentRequest = {
      title: req.body.title,
      description: req.body.description,
      severity: req.body.severity,
      createdBy: req.user.id //Number(req.headers['x-created-by'])
    };

    const incident = await this.createIncident.execute(data);

    const response = IncidentMapper.toResponseDTO(incident);

    res.status(201).json(response);
  }

  async getAll(req: Request, res: Response) {
    const incidents = await this.getAllIncidents.execute();

    const response = (incidents as IncidentWithUser[]).map(incident =>
      IncidentMapper.toResponseDTO(incident, incident.user) 
    );
  
    res.status(200).json(response);
  }

  async update(req: Request, res: Response) {

    const { id } = req.params;
    const { title, description } = req.body;
    const createdBy = req.headers['x-created-by'] as string;

    const incident = await this.updateIncident.execute(id, { title, description, createdBy });

    const response = IncidentMapper.toResponseDTO(incident);

    res.json(response);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const currentUserId = req.user.id;

    await this.deleteIncident.execute(id, Number(currentUserId));
    res.status(204).send();
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const incident = await this.getIncidentById.execute(id);
    const incidentWithUser = incident as IncidentWithUser;
   
    const response = IncidentMapper.toResponseDTO(incidentWithUser, incidentWithUser.user);
    
    res.status(200).json(response);
  }
}