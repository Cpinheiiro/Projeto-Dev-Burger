// src/config/database.cjs
process.loadEnvFile();
module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'dev-burger-db',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'dev-burger-db-test',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};