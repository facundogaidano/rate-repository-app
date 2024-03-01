import { useMutation } from '@apollo/client'

import { ADD_REVIEW } from '../graphql/mutations'

export const useReview = () => {
  const [createReview, result] = useMutation(ADD_REVIEW)

  const submitReview = async ({ ownerName, rating, repositoryName, text }) => {
    const review = { ownerName, rating: parseInt(rating, 10), repositoryName, text }

    const payload = await createReview({
      variables: { review }
    })
    return payload
  }

  return [submitReview, result]
}
