import {
  MutationResolvers,
  Place,
  Post,
  PostType,
  QueryResolvers,
} from "../type-defs.generated"

interface IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
}
const resolvers: IResolvers = {
  Mutation: {},
  Query: {
    posts: (root, args, ctx): Post[] => {
      const post = {
        GPSVerified: false,
        content: "that was ffffucked",
        id: "123",
        place: {
          where: "my house",
        } as Place,
        time: new Date(),
        type: PostType.AdHoc,
      }
      return [post]
    },
  },
}

export { resolvers }
