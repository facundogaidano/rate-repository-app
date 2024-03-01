import { FlatList, View, StyleSheet } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Button, Menu, Searchbar } from 'react-native-paper'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  buttonList: {
    paddingVertical: 5,
    backgroundColor: theme.colors.mainBackground,
    borderRadius: theme.roundness
  },
  textColor: {
    color: theme.colors.appBarBackground
  },
  searchBar: {
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: theme.roundness,
    color: theme.colors.textSecondary
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onRepositoryPress, ListHeaderComponent }) => {
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
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [selectedOption, setSelectedOption] = useState('CREATED_AT')
  const [menuVisible, setMenuVisible] = useState(false)
  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword)
  const navigate = useNavigate() // Get the navigate function

  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)

  const handleRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`) // Navigate to the single repository view
  }

  const handleOrderByChange = (selectedOrderBy) => {
    if (selectedOrderBy === 'HIGHEST_RATED') {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('DESC') // Highest rated first
    } else if (selectedOrderBy === 'LOWEST_RATED') {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('ASC') // Lowest rated first
    } else {
      setOrderBy(selectedOrderBy)
      setOrderDirection('DESC') // Default to descending for latest
    }
    setSelectedOption(selectedOrderBy) // Update the selected option in the picker
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={handleRepositoryPress} // Pass the onPress handler
      ListHeaderComponent={
        <>
          <Searchbar
            placeholder='Search'
            onChangeText={setSearchKeyword}
            style={styles.searchBar}
            value={searchKeyword}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          >
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <View>
                  <Button style={styles.buttonList} onPress={openMenu}>
                    <Text style={styles.textColor}>
                      {selectedOption === 'CREATED_AT'
                        ? 'Latest Repositories'
                        : selectedOption === 'HIGHEST_RATED' ? 'Highest Rated Repositories' : 'Lowest Rated Repositories'}
                    </Text>
                  </Button>
                </View>
          }
            >
              <Menu.Item
                onPress={() => {
                  handleOrderByChange('CREATED_AT')
                  closeMenu()
                }} title='Latest Repositories'
              />
              <Menu.Item
                onPress={() => {
                  handleOrderByChange('HIGHEST_RATED')
                  closeMenu()
                }} title='Highest Rated Repositories'
              />
              <Menu.Item
                onPress={() => {
                  handleOrderByChange('LOWEST_RATED')
                  closeMenu()
                }} title='Lowest Rated Repositories'
              />
            </Menu>
          </View>
        </>
      }

    />
  )
}

export default RepositoryList
