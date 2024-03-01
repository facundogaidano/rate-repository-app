import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'

import Button from './Button'
import FormikTextInput from './FormikTextInput'
import useSignIn from '../hooks/useSignIn'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  fieldContainer: {
    marginBottom: 15
  }
})

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput placeholderTextColor={theme.colors.divider} style={theme.colors.primary} name='username' placeholder='Username' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name='password'
          placeholder='Password'
          placeholderTextColor={theme.colors.divider}
          secureTextEntry
        />
      </View>
      <Button testID='signInButton' onPress={onSubmit}>Sign in</Button>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    await signIn({ username, password })

    navigate('/', { replace: true })
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
