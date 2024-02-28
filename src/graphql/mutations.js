import { gql } from '@apollo/client'

export const USER_LOGIN = gql`
 mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
 }
`
