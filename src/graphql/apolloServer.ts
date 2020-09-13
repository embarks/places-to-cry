import { ApolloServer } from "apollo-server-lambda"

import { create } from "./data/KnexPostgres"
import Posts from "./data/Posts"
import { resolvers } from "./resolvers"
import schema from "./schema"

// import AuthScope from './Captcha'
// https://developers.google.com/recaptcha/docs/verify

export default async function createHandler() {
  // create a connection once, not for every request
  const store = await create()

  const apolloServer = new ApolloServer({
    // context: (integrationContext) => {
    //   const { event, context } = integrationContext
    // todo [esb] provide auth scope like so
    //   return {
    //     AuthScope: new AuthScope(integrationContext)
    //   }
    // },
    dataSources: () => ({
      PostsAPI: new Posts({ store }),
    }),
    introspection: true,
    playground: true,
    resolvers: resolvers as any,
    typeDefs: schema,
  })
  const handler = await apolloServer.createHandler()
  return handler
}
