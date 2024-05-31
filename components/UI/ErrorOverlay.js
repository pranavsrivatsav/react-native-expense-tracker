import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { GlobalStyles } from '../../constants/styles'

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button style={styles.buttonContainer} onPress={onConfirm}>OK</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  message: {
    margin: 12,
    color: 'white',
    fontSize: 16
  },
  text: {
    color: 'white'
  },
  title: {
    fontSize: 20
  },
  message: {
    margin: 4,
    fontSize: 18
  },
  buttonContainer: {
    margin: 12,
  }
});