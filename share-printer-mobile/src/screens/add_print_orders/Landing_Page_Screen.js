import React from "react"
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View } from "react-native"
import bgImage from "../../images/background_login_register.jpg"

function Landing_Page_Screen(props) {
  const goto_form_order_print = () => {
    props.navigation.navigate("Google Map Shop")
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <Text>Landing page here!</Text>
        <View style={styles.button_near_bottom}>
          <TouchableOpacity onPress={goto_form_order_print} style={styles.button}>
            <Text style={styles.button_text}>Make an order</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },
  button_near_bottom: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
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
