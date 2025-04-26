import { Container } from 'inversify';
import { RabbitMQConnection } from '../infrastructure/server/RabbitMQConnection';
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
import { UserRepository } from '../application/user/ports/UserRepository';
import { UserSequalizeRepository } from '../infrastructure/user/db/UserSequalizeRepository';
import { CreateUser } from '../application/user/usecases/CreateUser';
import { GetAllUser } from '../application/user/usecases/GetAllUser';
import { GetUserById } from '../application/user/usecases/GetUserById';
import { DeleteUser } from '../application/user/usecases/DeleteUser';
import { UpdateUser } from '../application/user/usecases/UpdateUser';
import { UserController } from '../infrastructure/user/http/controllers/UserController';
import { RabbitMqEventPublisher } from '../infrastructure/events/RabbitMqEventPublisher';
import { EventPublisher } from '../application/incident/ports/IncidentEventPublisher';
import { IncidentCreatedConsumer } from '../infrastructure/events/consumers/IncidentCreatedConsumer';

const container = new Container();

container.bind<Sequelize>('Sequelize').toConstantValue(sequelize);
container.bind<IncidentRepository>('IncidentRepository').to(IncidentSequalizeRepository);
container.bind<UserRepository>('UserRepository').to(UserSequalizeRepository);

container.bind(CreateIncident).toSelf();
container.bind(GetAllIncidents).toSelf();
container.bind(GetIncidentById).toSelf();
container.bind(DeleteIncident).toSelf();
container.bind(UpdateIncident).toSelf();

container.bind(CreateUser).toSelf();
container.bind(GetAllUser).toSelf();
container.bind(GetUserById).toSelf();
container.bind(DeleteUser).toSelf();
container.bind(UpdateUser).toSelf();

container.bind(IncidentController).toSelf();
container.bind(UserController).toSelf();
container.bind(Server).toSelf();

container.bind(RabbitMQConnection).toSelf().inSingletonScope();
container.bind(IncidentCreatedConsumer).toSelf();
container.bind<EventPublisher>('EventPublisher').to(RabbitMqEventPublisher);

export { container };