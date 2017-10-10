import settings from './settings';

export const development = {
  client: settings.db.client,
  connection: settings.db.connection.development,
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};

export const production = {
  client: settings.db.client,
  connection: settings.db.connection.production,
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};

export const test = {
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};