import { View, Image, StyleSheet, Linking, Pressable } from 'react-native'
import theme from '../theme'
import Text from './Text'
import formatInThousands from '../utils/formatInThousands'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  nameText: {
    marginBottom: 5
  },
  descriptionText: {
    flexGrow: 1
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  countItemCount: {
    marginBottom: 5
  },
  languageContainer: {
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6
  }
})

const CountItem = ({ label, count, testID }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight='bold' testID={testID}>
        {formatInThousands(count)}
      </Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  )
}

const RepositoryItem = ({ repository, showGitHubButton, onPress }) => {
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url
  } = repository

  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Pressable onPress={() => onPress(id)}>
            <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Pressable onPress={() => onPress(id)}>
            <Text
              style={styles.nameText}
              fontWeight='bold'
              fontSize='subheading'
              numberOfLines={1}
            >
              {fullName}
            </Text>
          </Pressable>
          <Text style={styles.descriptionText} color='textSecondary'>
            {description}
          </Text>
          {language
            ? (
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
              )
            : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountItem count={stargazersCount} label='Stars' testID={`${id}-stargazer-count`} />
        <CountItem count={forksCount} label='Forks' testID={`${id}-forks-count`} />
        <CountItem count={reviewCount} label='Reviews' testID={`${id}-review-count`} />
        <CountItem count={ratingAverage} label='Rating' testID={`${id}-rating-average`} />
      </View>
      {showGitHubButton && (
        <Button title='Open in GitHub' onPress={() => Linking.openURL(url)}>Open in GitHub</Button>
      )}
    </View>
  )
}

export default RepositoryItem
