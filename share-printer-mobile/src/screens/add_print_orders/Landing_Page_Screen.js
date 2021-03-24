import React from "react"
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native"
import bgImage from "../../images/The-5-Best-Professional-Print-Labs-to-Use.jpg"
import logo from "../../images/1.png"

function Landing_Page_Screen(props) {
  const goto_form_order_print = () => {
    props.navigation.navigate("Google Map Shop")
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.button_near_bottom}>
          <Text style={styles.text_landing_page}>Printing made easier!</Text>
          <TouchableOpacity onPress={goto_form_order_print} style={styles.button}>
            <Text style={styles.button_text}>Make an order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 160,
    borderRadius: 200,
    elevation: 2,
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
  text_landing_page: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    backgroundColor: "#107C10",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    zIndex: 1,

  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
})

export default Landing_Page_Screen
