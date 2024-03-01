import { useMutation } from '@apollo/client'

import { CREATE_USER } from '../graphql/mutations'

export const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER)

  const signUp = async ({ username, password }) => {
    const user = { username, password }

    const payload = await createUser({
      variables: { user }
    })
    return payload
  }

  return [signUp, result]
}
