import { View, Text, StyleSheet, Image } from 'react-native'
import theme from '../theme'

const formatNumber = (num) => {
  if (num === undefined) {
    return '0'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{repository.fullName}</Text>
          <Text style={styles.body}>{repository.description}</Text>
          <View>
            <Text style={styles.langTag}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerStats}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsNumber}>{formatNumber(repository.stargazersCount)}</Text>
          <View style={styles.statsTextContainer}>
            <Text style={styles.statsText}>Stars</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsNumber}>{formatNumber(repository.forksCount)}</Text>
          <View style={styles.statsTextContainer}>
            <Text style={styles.statsText}>Forks</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsNumber}>{formatNumber(repository.reviewCount)}</Text>
          <View style={styles.statsTextContainer}>
            <Text style={styles.statsText}>Review</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsNumber}>{formatNumber(repository.ratingAverage)}</Text>
          <View style={styles.statsTextContainer}>
            <Text style={styles.statsText}>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 15,
    borderColor: '#e1e4e8',
    flex: 1
  },
  containerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 20
  },
  statsNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main
  },
  statsTextContainer: {
    paddingBottom: 5,
    paddingTop: 10,
    fontFamily: theme.fonts.main
  },
  statsText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 1
  },
  title: {
    fontSize: 17,
    marginTop: 5,
    paddingBottom: 3,
    fontWeight: '700',
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary
  },
  body: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.main
  },
  langTag: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    color: theme.colors.textAppBar,
    fontFamily: theme.fonts.main,
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 5
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    alignSelf: 'flex-start'
  }
})

export default RepositoryItem
