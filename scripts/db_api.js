const {Client} = require('pg');
const config = require('dotenv').config().parsed;

const client = new Client({
  host: config.PG_HOST,
  port: config.PG_PORT,
  database: config.PG_ROOT_DATABASE,
  user: config.PG_ROOT_USER,
  password: config.PG_ROOT_PASSWORD,
})

const checkDatabaseIfExists = (client, databaseName) => {
  return new Promise(async (resolve, reject) => {
    const query = `
      SELECT
      FROM pg_database
      WHERE datname = '${databaseName}';
    `;
    try {
      const res = await client.query(query);
      if (res?.rows?.[0]) {
        console.log(`Database "${databaseName}" is exists.`);
        resolve(true);
      } else {
        console.log(`Database ${databaseName} NOT exists.`);
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  })
}

const createDatabase = (client, databaseName, dbOwner) => {
  return new Promise(async (resolve, reject) => {
    const query = `
      CREATE DATABASE ${databaseName} OWNER ${dbOwner};
    `;
    try {
      await client.query(query);
      console.log(`Database "${databaseName}" created.`);
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

const dropDatabase = (client, databaseName) => {
  return new Promise(async (resolve, reject) => {
    const query = `
      DROP DATABASE ${databaseName};
    `;
    try {
      await client.query(query);
      console.log(`Database "${databaseName}" deleted.`);
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  client,
  checkDatabaseIfExists,
  createDatabase,
  dropDatabase
}
