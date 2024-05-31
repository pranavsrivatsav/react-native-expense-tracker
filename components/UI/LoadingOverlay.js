import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const LoadingOverlay = ({message}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingOverlay;

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
  }
});
