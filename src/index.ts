import dotenv from 'dotenv';
dotenv.config();
import { container } from './di/dependencyInjection';
import { Server } from './infrastructure/server/Server';


const server = container.get(Server);
server.listen();