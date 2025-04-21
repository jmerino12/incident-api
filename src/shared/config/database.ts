import { Sequelize } from 'sequelize';

const isDevelopment = process.env.NODE_ENV === 'development';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: isDevelopment ? console.log : false
});