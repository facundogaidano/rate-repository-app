import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'
import { Link, useNavigate } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    // marginLeft: 15,
    marginBottom: 10,
    // marginTop: 10
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  title: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main
  },
  signInOut: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.signIn,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.main
  }
})

const AppBarTab = ({ title }) => {
  const { data } = useQuery(GET_CURRENT_USER)
  const currentUser = data?.me
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const onSignOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
  }

  return (
    <Pressable style={styles.container}>
      <Link to='/'><Text style={styles.title}>{title}</Text></Link>
      {currentUser
        ? (
          <Pressable onPress={onSignOut}>
            <Text style={styles.signInOut}>Sign Out</Text>
          </Pressable>
          )
        : (
          <Link to='/login'>
            <Text style={styles.signInOut}>Sign In</Text>
          </Link>
          )}
    </Pressable>
  )
}

export default AppBarTab
