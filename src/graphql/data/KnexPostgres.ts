import Knex from "knex"
import { attachPaginate } from "knex-paginate"
import Config from "../../../config"

const Database = Config.postgres

/**
 * Initialize a new Postgres provider
 */
export async function create() {
  const knex = Knex({
    acquireConnectionTimeout: 2000,
    client: "pg",
    connection: {
      database: Database.database,
      host: Database.host,
      password: Database.password,
      port: Number(Database.port),
      user: Database.user,
    },
  })

  attachPaginate()

  // Verify the connection before proceeding
  try {
    await knex.raw("SELECT now()")

    return knex
  } catch (error) {
    throw new Error(
      "Unable to connect to Postgres via Knex. Ensure a valid connection."
    )
  }
}

export default { create }
