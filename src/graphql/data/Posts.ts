import { DataSource } from "apollo-datasource"
import Knex from "knex"
import { Place, Post, PostInput } from "../type-defs.generated"

class Posts extends DataSource {
  public store
  public context

  constructor({ store }: { store: Knex }) {
    super()
    this.store = store
  }

  public initialize(config) {
    this.context = config.context
  }

  public async createPost(input: PostInput): Promise<Post | null> {
    const {
      type,
      GPSVerified,
      time,
      content,
      Latitude,
      Longitude,
      inputType,
      where,
    } = input

    const result: Post = await this.store.transaction(
      async (trx: Knex): Promise<Post> => {
        const newPlace: Omit<Place, "id"> = {
          Latitude,
          Longitude,
          type: inputType,
          where,
        }

        const places: Place[] = await trx("places").insert(newPlace, [
          "id",
          "Latitude",
          "Longitude",
          "where",
          "type",
        ])

        const [place] = places

        const [created] = await trx("posts").insert(
          {
            content,
            gpsVerified: GPSVerified,
            placeId: place.id,
            time: new Date(time).toISOString(),
            type,
          },
          ["id", "gpsVerified", "time", "type", "content"]
        )

        const post = {
          GPSVerified: created.gpsVerified,
          content: created.content,
          id: created.id,
          place,
          time: created.time,
          type: created.type,
        }

        return post
      }
    )
    return result
  }
}

export default Posts
