import { gql } from '@apollo/client'

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String){
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...repositoryBaseFields
          ratingAverage
          reviewCount
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`

export const GET_CURRENT_USER = gql`
  query {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`

export const GET_USER_REVIEWS = gql`
  query {
    me {
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            text
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
 query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }  
      }
    }
 }
`
