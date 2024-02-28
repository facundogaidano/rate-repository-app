import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'
import { Link } from 'react-router-native'
import useSignOut from '../hooks/useSignOut'
import useAuthStorage from '../hooks/useAuthStorage'
import { useEffect, useState } from 'react'

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
  const [isSignedIn, setIsSignedIn] = useState(false)
  const signOut = useSignOut()
  const authStorage = useAuthStorage()

  const handleSignOut = async () => {
    await signOut()
    setIsSignedIn(false)
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await authStorage.getAccessToken()
      setIsSignedIn(token !== null)
    }

    checkAuthStatus()
  }, [])

  return (
    <Pressable style={styles.container}>
      <Link to='/'><Text style={styles.title}>{title}</Text></Link>
      {isSignedIn
        ? (
          <Pressable onPress={handleSignOut}>
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
