import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold
  }
})

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

export default AppBarTab
