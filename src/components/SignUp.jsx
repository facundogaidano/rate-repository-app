import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import { StyleSheet, View } from 'react-native'
import { useSignUp } from '../hooks/useSignUp'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import theme from '../theme'
import Button from './Button'

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Username minimum of 3 required').required('Username is required'),
  password: yup.string().min(8, 'Password minimum of 8 required').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required')
})

const SignUpForm = ({ onSubmit }) => {
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
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name='confirmPassword'
          placeholder='Confirm password'
          placeholderTextColor={theme.colors.divider}
          secureTextEntry
        />
      </View>
      <Button testID='signInButton' onPress={onSubmit}>Sign up</Button>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    await signUp({ username, password })

    navigate('/', { replace: true })
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  fieldContainer: {
    marginBottom: 15
  }
})

export default SignUp
