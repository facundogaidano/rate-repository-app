import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USER_REVIEWS } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'
import Text from './Text'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import Button from './Button'
import { useState } from 'react'

const UserReviewList = () => {
  const { loading, error, data } = useQuery(GET_USER_REVIEWS)
  const client = useApolloClient()
  const [showAlert, setShowAlert] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)
  const navigate = useNavigate()

  const handleDelete = (reviewId) => {
    setReviewToDelete(reviewId)
    setShowAlert(true)
  }

  const handleViewRepository = (repositoryId) => {
    console.log(repositoryId)
    navigate(`/repository/${repositoryId}`)
  }

  const handleConfirmDelete = () => {
    client.mutate({
      mutation: DELETE_REVIEW,
      variables: { deleteReviewId: reviewToDelete },
      update: (cache, { data: { deleteReview } }) => {
        // Obtén la lista actual de reviews de la caché
        const data = cache.readQuery({ query: GET_USER_REVIEWS })

        // Filtra la lista para excluir el review eliminado
        const updatedReviews = data.me.reviews.edges.filter(edge => edge.node.id !== reviewToDelete)

        // Escribe la lista actualizada de reviews de vuelta en la caché
        cache.writeQuery({
          query: GET_USER_REVIEWS,
          data: {
            me: {
              ...data.me,
              reviews: {
                ...data.me.reviews,
                edges: updatedReviews
              }
            }
          }
        })
      }
    }).then(() => {
      setShowAlert(false)
    }).catch((error) => {
      console.error('Error al eliminar el review:', error)
    })
    setShowAlert(false)
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviews = data.me.reviews.edges.map(edge => edge.node)

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewerUsername}>{item.repository.fullName}</Text>
        <Text style={styles.reviewDate}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='View Repository' onPress={() => handleViewRepository(item.repository.id)}>View</Button>
        <Button title='Delete' onPress={() => handleDelete(item.id)}>Delete</Button>
      </View>
    </View>
  )

  if (showAlert) {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => setShowAlert(false),
          style: 'cancel'
        },
        { text: 'OK', onPress: handleConfirmDelete }
      ]
    )
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderReviewItem}
      keyExtractor={(item) => item.id}
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
    minWidth: 50,
    height: 50,
    borderRadius: 20,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
})

export default UserReviewList
