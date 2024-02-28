import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })
  const repositories = data?.repositories.edges.map(edge => edge.node) || []

  return { repositories, loading, error }
}

export default useRepositories
