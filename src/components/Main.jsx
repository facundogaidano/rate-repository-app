import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    flexGrow: 1,
    flexShrink: 1
  }
})

const Main = () => {
  return (
    <>
      <View style={styles}>
        <AppBar />
        <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </>
  )
}

export default Main