import React from "react"
import { StyleSheet, Text, View } from "react-native"

function Test_Screen() {
  return (
    <View style={styles.container}>
      <Text>Test Screen!</Text>
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

export default Test_Screen
