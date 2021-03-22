import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Landing_Page_Screen(props) {
  const goto_form_order_print = () => {
    props.navigation.navigate("Google Map Shop")
  }
  return (
    <View style={styles.container}>
      <Text>Landing page here!</Text>

      <TouchableOpacity onPress={goto_form_order_print} style={styles.button}>
        <Text style={styles.button_text}>Make an order</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#fb0b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Landing_Page_Screen
