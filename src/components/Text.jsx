import { Text as NativeText, StyleSheet } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorAppBar: {
    color: theme.colors.textAppBar
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading
  },
  fontSizeSignIn: {
    fontSize: theme.fontSizes.signIn
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  }
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'appBar' && styles.colorAppBar,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'signin' && styles.fontSizeSignIn,
    fontWeight === 'bold' && styles.fontWeightBold,
    style
  ]

  return <NativeText style={textStyle} {...props} />
}

export default Text
