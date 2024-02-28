import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username ? { borderColor: '#d73a4a' } : {}
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password && formik.errors.password ? { borderColor: '#d73a4a' } : {}
        ]}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} disabled={!formik.isValid}>
        <Button title='Sign In' onPress={formik.handleSubmit} disabled={!formik.isValid} />
      </Pressable>
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

  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15
  },
  textInput: {
    height: 60,
    fontSize: 18,
    marginTop: 10,
    padding: 15,
    color: theme.colors.textSecondary,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: theme.fonts.main
  },
  button: {
    marginTop: 10,
    height: 60,
    fontSize: 18
  }
})
