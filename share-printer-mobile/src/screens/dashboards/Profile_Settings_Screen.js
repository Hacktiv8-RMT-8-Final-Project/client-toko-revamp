import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Profile_Settings_Screen(props) {
  const log_out_go_to_home = () => {
    props.navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
      <Text>User profile screen!</Text>

      <TouchableOpacity onPress={log_out_go_to_home} style={styles.button}>
        <Text style={styles.button_text}>Log Out</Text>
      </TouchableOpacity>
      <Text>Profile_Settings_Screen!</Text>
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

export default Profile_Settings_Screen
