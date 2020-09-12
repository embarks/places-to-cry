import dotenv from "dotenv"

dotenv.config()

const config = {
  postgres: {
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
  },
}

export const knex = {
  development: {
    client: "pg",
    connection: {
      ...config.postgres,
    },
  },
  production: {
    client: "pg",
    connection: {
      ...config.postgres,
    },
    pool: {
      acquireTimeoutMillis: 30000,
      createRetryIntervalMillis: 100,
      createTimeoutMillis: 3000,
      idleTimeoutMillis: 30000,
      max: 6,
      min: 2,
      propagateCreateError: false, // <- default is true, set to false
      reapIntervalMillis: 1000,
    },
  },
}

export default config
