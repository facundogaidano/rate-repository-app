import { FlatList, View, StyleSheet, Text } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories()

  if (loading) return (<Text>Loading...</Text>)
  if (error) return (<Text>Error: {error.message}</Text>)

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
    />
  )
}

export default RepositoryList
