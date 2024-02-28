import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    textAppBar: '#f8f8f8'
  },
  fontSizes: {
    body: 14,
    subheading: 14,
    heading: 22,
    signIn: 18
  },
  fonts: {
    main: Platform.OS === 'android' ? 'Roboto' : Platform.OS === 'ios' ? 'Arial' : 'System'
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  }
}

export default theme
