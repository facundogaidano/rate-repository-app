import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../graphql/mutations'
import AuthStorage from '../utils/authStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(USER_LOGIN)
  const authStorage = new AuthStorage()

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password
          }
        }
      })
      console.log(data)
      await authStorage.setAccessToken(data.authenticate.accessToken)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return [signIn, result]
}

export default useSignIn
