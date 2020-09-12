import { gql } from "apollo-server-lambda"

const posts = gql`
  query posts($sortOrder: SortOrder = DESC, $sortBy: PostSortField = time) {
    posts(sortBy: $sortBy, sortOrder: $sortOrder) {
      page {
        id
        content
        type
        GPSVerified
        place {
          id
          where
          type
          Latitude
          Longitude
        }
      }
      pageInfo {
        total
      }
    }
  }
`

export default posts
