import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client' // Importa ApolloProvider
import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'

const apolloClient = createApolloClient()

const App = () => {
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
