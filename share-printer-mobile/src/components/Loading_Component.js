import React from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

function Loading_Screen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#107C10" />
      <Text>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Loading_Screen
