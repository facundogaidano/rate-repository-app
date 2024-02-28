import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
import Constants from 'expo-constants'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'

const apolloClient = createApolloClient()

const App = () => {
  console.log(Constants.expoConfig.extra.env)

  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto' />
    </ApolloProvider>
  )
}

export default App
