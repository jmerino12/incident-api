import express, { Application } from 'express';
import { Sequelize } from 'sequelize';
import 'reflect-metadata';
import { injectable,inject } from 'inversify';
import rateLimit from 'express-rate-limit';
import authRoutes from '../incident/http/routes/authRoutes';
import incidentRoutes from '../incident/http/routes/incidentRoutes';
import usertRoutes from '../user/http/routes/userRoutes';
import { errorHandler } from '../incident/http/middlewares/errorHandler';
import { defineIncidentModel, IncidentModel } from '../incident/db/models/IncidentModel';
import { defineUserModel, UserModel } from '../user/db/models/UserModel';
import { IncidentController } from '../incident/http/controllers/IncidentController';
import { UserController } from '../user/http/controllers/UserController';
import { RabbitMQConnection } from './RabbitMQConnection';
import { IncidentCreatedConsumer } from '../events/consumers/IncidentCreatedConsumer';


@injectable()
export class Server {
  private app: Application;
  private port: string;

  constructor(
    @inject('Sequelize') private sequelize: Sequelize,
    @inject(IncidentController) private incidentController: IncidentController,
    @inject(UserController) private userController: UserController,
    @inject(RabbitMQConnection) private rabbitMQConnection: RabbitMQConnection,
    @inject(IncidentCreatedConsumer) private incidentCreatedConsumer: IncidentCreatedConsumer 
  ) {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.initModels();
    this.initAssociations();
    this.middlewares();
    this.routes();
    this.initRabbitMQ();
    this.startConsumer();
  }

  private async dbConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
    }
  }

  private middlewares() {
    this.app.use(express.json());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again after 15 minutes',
    });

    this.app.use(limiter);
  }

  private routes() {
    this.app.use('/incidents', incidentRoutes(this.incidentController));
    this.app.use('/users', usertRoutes(this.userController));
    this.app.use('/auth', authRoutes());

    this.app.get('/ping', (_, res) => {
      res.send('pong');
    });

    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }

  public close() {
    process.exit(0);
  }

  private initModels() {
    defineIncidentModel(this.sequelize);
    defineUserModel(this.sequelize);
  }

  private async initAssociations() {
    UserModel.hasMany(IncidentModel, {
      sourceKey: 'identification',
      foreignKey: 'created_by',
      as: 'incidents'
    });
  
    IncidentModel.belongsTo(UserModel, {
      targetKey: 'identification',
      foreignKey: 'created_by',
      as: 'user',
    });

    await this.sequelize.sync({ alter: true, force: true });
    console.log('📦 Modelos sincronizados con la base de datos');
  }

  private async initRabbitMQ() {
    try {
      console.log('⌛️ Conectando a RabbitMQ...');
      await this.rabbitMQConnection.connect();
      console.log('✅ Conexión a RabbitMQ establecida');
    } catch (error) {
      console.error('❌ Error al conectar con RabbitMQ:', error);
    }
  }

  public async startConsumer() {
    await this.incidentCreatedConsumer.start();
  }
}
