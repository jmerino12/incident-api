import { Container } from 'inversify';
import { IncidentController } from '../infrastructure/http/controllers/IncidentController';
import { CreateIncident } from '../application/usecases/CreateIncident';
import { GetAllIncidents } from '../application/usecases/GetAllIncidents';
import { DeleteIncident } from '../application/usecases/DeleteIncident';
import { UpdateIncident } from '../application/usecases/UpdateIncident';
import { IncidentRepository } from '../application/ports/IncidentRepository';
import { InMemoryIncidentRepository } from '../infrastructure/db/InMemoryIncidentRepository';

const container = new Container();

container.bind<IncidentRepository>('IncidentRepository').to(InMemoryIncidentRepository);

InMemoryIncidentRepository
container.bind(CreateIncident).toSelf();
container.bind(GetAllIncidents).toSelf();
container.bind(DeleteIncident).toSelf();
container.bind(UpdateIncident).toSelf();
container.bind(IncidentController).toSelf();

export { container };