import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

function Login_Screen(props) {
  const go_to_register_screen = () => {
    props.navigation.navigate("Register")
  }
  const go_to_dashboard_screen = () => {
    props.navigation.navigate("Dashboard")
  }
  const go_to_test_screen = () => {
    props.navigation.navigate("Test")
  }

  return (
    <View style={styles.container}>
      <Text>Login Screen!</Text>
      <TouchableOpacity onPress={go_to_dashboard_screen} style={styles.button}>
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={go_to_register_screen} style={styles.button}>
        <Text style={styles.button_text}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={go_to_test_screen} style={styles.button}>
        <Text style={styles.button_text}>Test</Text>
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

export default Login_Screen
