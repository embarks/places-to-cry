import createHandler from "./graphql/apolloServer"

export const graphqlHandler = (event, context, callback) => {
  createHandler().then((handler) => handler(event, context, callback))
}
