import {
  MutationResolvers,
  Post,
  PostInput,
  PostsPage,
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
    posts: async (root, args, { dataSources }): Promise<PostsPage> => {
      const page = await dataSources.PostsAPI.getPosts(args)
      return page
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
