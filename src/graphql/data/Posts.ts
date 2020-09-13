import { DataSource } from "apollo-datasource"
import Knex from "knex"
import {
  PageInfo,
  Place,
  PlacesPage,
  Post,
  PostInput,
  PostsPage,
  QueryPostsArgs,
  QuerySearchPlacesArgs,
} from "../type-defs.generated"

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

  // public async searchPlaces(args: QuerySearchPlacesArgs): Promise<PlacesPage> {

  // }

  public async getPosts(args: QueryPostsArgs): Promise<PostsPage> {
    const {
      sortBy,
      sortOrder,
      perPage,
      currentPage,
      isFromStart,
      isLengthAware,
    } = args

    const { data, pagination: pageInfo } = await this.store("posts")
      .select(
        { id: "posts.id" },
        { time: "posts.time" },
        { content: "posts.content" },
        { type: "posts.type" },
        { GPSVerified: "posts.gpsVerified" },
        { placeId: "places.id" },
        { inputType: "places.type" },
        { where: "places.where" },
        { Latitude: "places.Latitude" },
        { Longitude: "places.Longitude" }
      )
      .join("places", "posts.placeId", "=", "places.id")
      .orderBy([{ column: sortBy, order: sortOrder }])
      .paginate({ perPage, currentPage, isFromStart, isLengthAware })

    const page: Post[] = data.map((el) => {
      const {
        placeId: id,
        inputType: type,
        where,
        Latitude,
        Longitude,
        ...post
      } = el
      const place: Place = { id, type, where, Latitude, Longitude }

      return { ...post, place }
    })
    return { page, pageInfo }
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
