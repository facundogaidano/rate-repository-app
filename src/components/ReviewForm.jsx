import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useReview } from '../hooks/useReview'
import theme from '../theme'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  fieldContainer: {
    marginBottom: 15
  },
  textArea: {
    height: 100, // Ajusta la altura según sea necesario
    textAlignVertical: 'top'
  }
})

const initialValues = {
  ownerName: '', // Changed from 'owner' to 'ownerName'
  repositoryName: '', // Changed from 'name' to 'repositoryName'
  rating: '',
  text: '' // Changed from 'review' to 'text'
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'), // Changed from 'owner' to 'ownerName'
  repositoryName: yup.string().required('Repository name is required'), // Changed from 'name' to 'repositoryName'
  rating: yup.number().positive().integer().min(0).max(100).required('Rating is required'),
  text: yup.string().required('Leaving a review is required') // Changed from 'review' to 'text'
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          placeholderTextColor={theme.colors.divider}
          name='ownerName'
          placeholder='Repository owner name'
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          placeholderTextColor={theme.colors.divider}
          name='repositoryName'
          placeholder='Repository name'
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          placeholderTextColor={theme.colors.divider}
          name='rating'
          placeholder='Repository rating'
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          placeholderTextColor={theme.colors.divider}
          name='text'
          placeholder='Review'
          multiline
          numberOfLines={4} // Opcional: define el número de líneas iniciales
          style={[styles.textArea, { paddingTop: 10 }]}
        />
      </View>
      <Button testID='sendReviewButton' onPress={onSubmit}>Create a review</Button>
    </View>
  )
}

const Review = () => {
  const [review] = useReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values

    await review({ ownerName, rating, repositoryName, text })

    navigate('/', { replace: true })
  }

  return <ReviewContainer onSubmit={onSubmit} />
}

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default Review
