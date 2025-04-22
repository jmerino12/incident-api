import { Container } from 'inversify';
import { Sequelize } from 'sequelize';
import { sequelize } from '../shared/config/database';
import { Server } from '../infrastructure/server/Server';
import { CreateIncident } from '../application/incident/usecases/CreateIncident';
import { GetAllIncidents } from '../application/incident/usecases/GetAllIncidents';
import { GetIncidentById } from '../application/incident/usecases/GetIncidentById';
import { DeleteIncident } from '../application/incident/usecases/DeleteIncident';
import { UpdateIncident } from '../application/incident/usecases/UpdateIncident';
import { IncidentRepository } from '../application/incident/ports/IncidentRepository';
import { IncidentController } from '../infrastructure/incident/http/controllers/IncidentController';
import { IncidentSequalizeRepository } from '../infrastructure/incident/db/IncidentSequalizeRepository';

const container = new Container();

container.bind<Sequelize>('Sequelize').toConstantValue(sequelize);
container.bind<IncidentRepository>('IncidentRepository').to(IncidentSequalizeRepository);

container.bind(CreateIncident).toSelf();
container.bind(GetAllIncidents).toSelf();
container.bind(GetIncidentById).toSelf();
container.bind(DeleteIncident).toSelf();
container.bind(UpdateIncident).toSelf();

container.bind(IncidentController).toSelf();
container.bind(Server).toSelf();

export { container };