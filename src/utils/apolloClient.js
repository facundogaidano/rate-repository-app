import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
import AuthStorage from './authStorage'

const APOLLO_URI = Constants.expoConfig.extra.apolloUri

const httpLink = createHttpLink({
  uri: APOLLO_URI
})

const authStorage = new AuthStorage()

const createApolloClient = () => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    } catch (error) {
      console.error(error)
      return {
        headers
      }
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

export default createApolloClient
