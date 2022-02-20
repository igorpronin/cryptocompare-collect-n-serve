const config = require('dotenv').config().parsed;
const {client, checkDatabaseIfExists, createDatabase} = require('./db_api');

(async () => {
  try {
    const dbName = config.PG_DATABASE;
    const dbOwner = config.PG_DB_OWNER;
    await client.connect();
    console.log('Connected to postgres.');
    const isExists = await checkDatabaseIfExists(client, dbName);
    if (!isExists) await createDatabase(client, dbName, dbOwner);
    await client.end();
    console.log('Database connection closed.');
  } catch (e) {
    console.log(e);
  }
})()
