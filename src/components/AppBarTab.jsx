import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'
import { Link } from 'react-router-native'

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
  signIn: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.signIn,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.main
  }
})

const AppBarTab = ({ title }) => {
  return (
    <Pressable style={styles.container}>
      <Link to='/'><Text style={styles.title}>{title}</Text></Link>
      <Pressable>
        <Link to='/login'><Text style={styles.signIn}>Sign In</Text></Link>
      </Pressable>
    </Pressable>
  )
}

export default AppBarTab
