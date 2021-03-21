import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

function Dashboard_Screen(props) {
  return (
    <View style={styles.container}>
      <Text>Dashboard Screen!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    display: "flex",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
    margin: 5,
    borderWidth: 1,
    borderColor: "blue",

    backgroundColor: "white",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Dashboard_Screen
