import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Profile_Settings_Screen(props) {
  const log_out_go_to_home = () => {
    props.navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
      <Text>Profile Settings!</Text>
      <TouchableOpacity onPress={log_out_go_to_home} style={styles.button}>
        <Text style={styles.button_text}>Log Out</Text>
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

export default Profile_Settings_Screen
