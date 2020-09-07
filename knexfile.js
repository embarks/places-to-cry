require("pg")

const path = require("path")
const dotEnvConfig = {
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
}

require("dotenv").config(dotEnvConfig)

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
    },
  },
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL,
  // },
}
