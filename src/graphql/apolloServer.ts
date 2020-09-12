import { ApolloServer } from "apollo-server-lambda"

import { resolvers } from "./resolvers"
import schema from "./schema"
// import AuthScope from './Captcha'
// https://developers.google.com/recaptcha/docs/verify

const apolloServer = new ApolloServer({
  // context: (integrationContext) => {
  //   const { event, context } = integrationContext
  // todo [esb] provide auth scope like so
  // return {
  // AuthScope: new AuthScope(integrationContext)
  // }
  // },
  // dataSources: () => {
  // },
  introspection: true,
  playground: true,
  resolvers: resolvers as any,
  typeDefs: schema,
  // subscriptions: {},
})

export default apolloServer.createHandler()
