import { gql } from "apollo-server-lambda"

const schema = gql`
  scalar Date

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    posts(
      sortBy: PostSortField
      sortOrder: SortOrder
      perPage: Int! = 10
      currentPage: Int = 1
      isFromStart: Boolean
      isLengthAware: Boolean
    ): PostsPage!

    searchPlaces(
      searchText: String
      searchRadius: SearchRadiusInput
    ): PlacesPage!
  }

  type Mutation {
    addPost(input: PostInput!): Post
  }

  enum PostSortField {
    time
  }

  enum SortOrder {
    ASC
    DESC
  }

  type PageInfo {
    total: Int
    lastPage: Int
    currentPage: Int!
    perPage: Int!
    from: Int!
    to: Int!
  }

  type PostsPage {
    page: [Post]!
    pageInfo: PageInfo!
  }

  type PlacesPage {
    page: [Place]!
    pageInfo: PageInfo!
  }

  type Post implements Node {
    id: ID!
    time: Date!
    place: Place!
    content: String!
    type: PostType!
    GPSVerified: Boolean!
  }

  input SearchRadiusInput {
    unit: DistanceUnit
    amount: Int
    coordinates: [CoordinatesInput!]!
  }

  input CoordinatesInput {
    Latitude: Float!
    Longitude: Float!
  }

  type Place implements Node & Coordinates {
    id: ID!
    Latitude: Float
    Longitude: Float
    where: String!
    type: PlaceUserInputType!
  }

  input PostInput {
    type: PostType!
    # the only way user can be GPS verified
    # is if user allows location
    # and user is crying there right now
    # i.e. (AD_HOC PostType)
    GPSVerified: Boolean!
    Latitude: Float
    Longitude: Float
    time: Date!
    content: String!
    inputType: PlaceUserInputType!
    where: String!
  }

  interface Node {
    id: ID!
  }

  enum PostType {
    AD_HOC
    POST_FACTO
  }

  enum DistanceUnit {
    MILES
    KILOMETERS
  }

  interface Coordinates {
    Latitude: Float
    Longitude: Float
  }

  enum PlaceUserInputType {
    MAPBOX_SEARCH_RESULT
    MAPBOX_COORDINATES
    RAW
  }
`

export default schema
