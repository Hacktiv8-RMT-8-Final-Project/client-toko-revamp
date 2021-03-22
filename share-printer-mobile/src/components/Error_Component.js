import React from "react"
import { StyleSheet, Text, View } from "react-native"

function Error_Screen() {
  return (
    <View style={styles.container}>
      <Text>Error...!!!</Text>
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

export default Error_Screen
