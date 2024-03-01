import { FlatList, View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onRepositoryPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <RepositoryItem
          repository={item}
          showGitHubButton={false} // You can set this to true or false based on your needs
          onPress={onRepositoryPress}
        />)}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate() // Get the navigate function

  const handleRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`) // Navigate to the single repository view
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={handleRepositoryPress} // Pass the onPress handler
    />
  )
}

export default RepositoryList
