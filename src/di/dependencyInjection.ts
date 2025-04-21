import { Container } from 'inversify';
import { sequelize } from '../shared/config/database';
import { IncidentController } from '../infrastructure/http/controllers/IncidentController';
import { CreateIncident } from '../application/usecases/CreateIncident';
import { GetAllIncidents } from '../application/usecases/GetAllIncidents';
import { DeleteIncident } from '../application/usecases/DeleteIncident';
import { UpdateIncident } from '../application/usecases/UpdateIncident';
import { GetIncidentById } from '../application/usecases/GetIncidentById';
import { IncidentRepository } from '../application/ports/IncidentRepository';
import { IncidentSequalizeRepository } from '../infrastructure/db/IncidentSequalizeRepository';
import { Sequelize } from 'sequelize';
import { Server } from '../infrastructure/server/Server';

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