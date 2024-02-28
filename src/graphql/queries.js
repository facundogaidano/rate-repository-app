import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          fullName
          language
          reviewCount
          stargazersCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`

// other queries...
