const config = require('dotenv').config().parsed;
const {client, checkDatabaseIfExists, dropDatabase} = require('./db_api');

(async () => {
  try {
    const dbName = config.PG_DATABASE;
    await client.connect();
    console.log('Connected to database.');
    const isExists = await checkDatabaseIfExists(client, dbName);
    if (isExists) await dropDatabase(client, dbName);
    await client.end();
    console.log('Database connection closed.');
  } catch (e) {
    console.log(e);
  }
})()
