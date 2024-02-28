import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor (namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken () {
    try {
      const value = await AsyncStorage.getItem(`${this.namespace}:accessToken`)
      if (value !== null) {
        console.log(value)
        return value
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  async setAccessToken (accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        accessToken
      )
      console.log('Access token saved')
    } catch (error) {
      console.error(error)
    }
  }

  async removeAccessToken () {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
      console.log('Access token removed')
    } catch (error) {
      console.error(error)
    }
  }
}

export default AuthStorage
