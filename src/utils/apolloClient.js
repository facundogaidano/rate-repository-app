import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'

const APOLLO_URI = Constants.expoConfig.extra.apolloUri

const createApolloClient = () => {
  return new ApolloClient({
    uri: APOLLO_URI,
    cache: new InMemoryCache()
  })
}

export default createApolloClient
