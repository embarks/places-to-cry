exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("places", function (table) {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()

      table.float("Latitude").nullable()

      table.float("Longitude").nullable()

      table.string("where").notNullable()

      table.enu("type", ["MAPBOX_SEARCH_RESULT", "MAPBOX_COORDINATES", "RAW"])
    })
    .createTable("posts", function (table) {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()

      table.timestamp("time").notNullable()

      table.uuid("placeId").notNullable()
      table.foreign("placeId").references("id").inTable("places")

      table.string("content").notNullable()

      table.enu("type", ["AD_HOC", "POST_FACTO"])

      table.boolean("gpsVerified")
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable("posts").dropTable("places")
}
