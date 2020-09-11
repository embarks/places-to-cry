import { ApolloServer } from "apollo-server-lambda"
import { resolvers } from "./resolvers"
import schema from "./schema"
// import AuthScope from './Captcha'
// https://developers.google.com/recaptcha/docs/verify

const NODE_ENV = process.env.NODE_ENV

const IS_DEV = !NODE_ENV || !["production"].includes(NODE_ENV)

const apolloServer = new ApolloServer({
  // todo [esb] provide auth scope like so
  // context: (integrationContext) => ({
  // AuthScope: new AuthScope(integrationContext)
  // })
  introspection: true,
  playground: true,
  resolvers: resolvers as any,
  typeDefs: schema,
  // subscriptions: {},
})

export default apolloServer.createHandler()
