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

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`

// other queries...
