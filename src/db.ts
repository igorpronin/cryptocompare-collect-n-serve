const env = require('dotenv').config().parsed;
import {Sequelize} from 'sequelize';

const SQL_CONSOLE_OUTPUT = false;

const sequelize = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
  host: env.PG_HOST,
  dialect: 'postgres',
  logging: SQL_CONSOLE_OUTPUT
});

export default sequelize;
