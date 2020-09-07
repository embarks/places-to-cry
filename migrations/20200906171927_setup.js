exports.up = function (knex) {
  return knex.schema
    .createTable("places", function (table) {
      table.uuid("id").primary()

      table.float("Latitude").nullable()

      table.float("Longitude").nullable()

      table.string("where").notNullable()

      table.enu("type", ["MAPBOX_SEARCH_RESULT", "MAPBOX_COORDINATES", "RAW"])

      table.datetime("time").notNullable()
    })
    .createTable("posts", function (table) {
      table.uuid("id").primary()

      table.timestamp("time").notNullable()

      table.uuid("placeId").notNullable()
      table.foreign("placeId").references("id").inTable("places")

      table.string("content").notNullable()

      table.enu("type", ["AD_HOC", "POST_FACTO"])

      table.boolean("gpsVerified")
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable("places").dropTable("posts")
}
