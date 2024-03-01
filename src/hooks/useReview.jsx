import { useMutation } from '@apollo/client'
import { ADD_REVIEW } from '../graphql/mutations'
import { GET_USER_REVIEWS } from '../graphql/queries'

export const useReview = () => {
  const [createReview, { data }] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_USER_REVIEWS }]
  })

  return [createReview, data]
}
