import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import Text from './Text'
import { FlatList, StyleSheet, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import { useNavigate, useParams } from 'react-router-native'
import { format } from 'date-fns'
import theme from '../theme'

const SingleRepositoryView = () => {
  const { repositoryId } = useParams()
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId }
  })
  const navigate = useNavigate()

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const repository = data.repository
  const reviews = repository.reviews.edges.map(edge => edge.node)

  const handleRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`) // Navigate to the single repository view
  }

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewerUsername}>{item.user.username}</Text>
        <Text style={styles.reviewDate}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  )

  return (
    <FlatList
      data={reviews}
      renderItem={renderReviewItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.headerContainer}>
          <RepositoryItem repository={repository} onPress={handleRepositoryPress} showGitHubButton />
        </View>
      )}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: theme.roundness,
    backgroundColor: 'white',
    marginVertical: 5
  },
  reviewContent: {
    flex: 1
  },
  reviewText: {
    fontSize: theme.fontSizes.reviewText,
    color: theme.colors.textPrimary
  },
  ratingContainer: {
    minWidth: 50, // Ancho mínimo del contenedor
    height: 50, // Altura del contenedor
    borderRadius: 20, // La mitad del ancho/altura para un círculo perfecto
    backgroundColor: 'white',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  ratingText: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.primary,
    textAlign: 'center'
  },
  reviewDate: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary
  },
  reviewerUsername: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold
  }
})

export default SingleRepositoryView
