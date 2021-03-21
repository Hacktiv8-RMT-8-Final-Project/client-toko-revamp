import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Google_Map_Shop_Screen(props) {
  const confirm_choose_shop = () => {
    props.navigation.navigate("Shop Profile")
  }
  return (
    <View style={styles.container}>
      <Text>Choose shop first - Google Map Here</Text>
      <TouchableOpacity onPress={confirm_choose_shop} style={styles.button}>
        <Text style={styles.button_text}>Confirm Shop</Text>
      </TouchableOpacity>
      <Text>Google_Map_Shop_Screen!</Text>
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

export default Google_Map_Shop_Screen
