require("pg")

require("dotenv").config()

const postgres = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  },
}
module.exports = {
  development: {
    ...postgres,
  },
  production: {
    ...postgres,
  },
}
