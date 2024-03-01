import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (orderBy, orderDirection) => {
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network'
  })

  return { repositories: data ? data.repositories : undefined, ...result }
}

export default useRepositories
