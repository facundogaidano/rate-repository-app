import { useApolloClient } from '@apollo/client'
import AuthStorage from '../utils/authStorage'

const useSignOut = () => {
  const apolloClient = useApolloClient()
  const authStorage = new AuthStorage()

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken()
      await apolloClient.resetStore()
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  return signOut
}

export default useSignOut
