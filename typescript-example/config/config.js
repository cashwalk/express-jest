const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'mysecretpassword';
const POSTGRES_DEFAULT_SCHEMA = process.env.POSTGRES_DEFAULT_SCHEMA || 'postgres';

console.warn(`Migrating to ${POSTGRES_HOST}`);

module.exports = {
  "development": {
    "username": POSTGRES_USERNAME,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DEFAULT_SCHEMA,
    "host": POSTGRES_HOST,
    "port": POSTGRES_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": POSTGRES_USERNAME,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DEFAULT_SCHEMA,
    "host": POSTGRES_HOST,
    "port": POSTGRES_PORT,
    "dialect": "postgres"
  }
}
