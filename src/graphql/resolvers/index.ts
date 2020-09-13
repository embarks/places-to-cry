import {
  MutationResolvers,
  Place,
  Post,
  PostInput,
  PostsPage,
  PostType,
  QueryResolvers,
} from "../type-defs.generated"

interface IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
  Node: { __resolveType: () => any }
  Coordinates: { __resolveType: () => any }
}

const resolvers: IResolvers = {
  Mutation: {
    addPost: async (
      root,
      { input }: { input: PostInput },
      { dataSources }
    ): Promise<Post | null> => {
      const post: Post = await dataSources.PostsAPI.createPost(input)
      return post
    },
  },
  Query: {
    posts: (root, args, { dataSources }): PostsPage => {
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
      return {
        page: [post],
        pageInfo: {
          currentPage: 1,
          from: 1,
          perPage: 10,
          to: 10,
        },
      }
    },
  },
  /*tslint:disable: object-literal-sort-keys */
  Node: {
    __resolveType: () => null,
  },
  Coordinates: {
    __resolveType: () => null,
  },
}

export { resolvers }
