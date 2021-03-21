import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

function Register_Screen(props) {
  const go_to_login_screen = () => {
    props.navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <Text>Register Screen!</Text>
      <TouchableOpacity onPress={go_to_login_screen} style={styles.button}>
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
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

export default Register_Screen
