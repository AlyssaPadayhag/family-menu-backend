// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require('path');
require('dotenv').config();

const { 
  DATABASE_URL  = 'postgres://dfowzbgi:i8XfiJEK460eC4hFmOVyh0kGh__DNAWM@fanny.db.elephantsql.com/dfowzbgi' 
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },
};