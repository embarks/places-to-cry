import {
  Place,
  Post,
  PostsQuery,
  PostType,
  QueryResolvers,
} from "../type-defs.generated"

interface IResolvers {
  Query: QueryResolvers
}
const resolvers: IResolvers = {
  Query: {
    posts(root, args, ctx): Post[] {
      const post = {
        GPSVerified: false,
        content: "that was f*****",
        id: "123",
        place: {} as Place,
        time: new Date(),
        type: {} as PostType,
        where: "my house",
      }
      return [post]
    },
  },
}

export default resolvers
