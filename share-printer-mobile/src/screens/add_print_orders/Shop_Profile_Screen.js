import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Shop_Profile_Screen(props) {
  const fill_add_form = () => {
    props.navigation.navigate("Form Order Print")
  }
  const chatting_with_shop = () => {
    console.log(`chatting_with_shop`)
  }
  return (
    <View style={styles.container}>
      <Text>Detail table product print Shop here!</Text>
      <TouchableOpacity onPress={fill_add_form} style={styles.button}>
        <Text style={styles.button_text}>Fill add Form</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={chatting_with_shop} style={styles.button}>
        <Text style={styles.button_text}>Chat shop</Text>
      </TouchableOpacity>
      <Text>Shop_Profile_Screen!</Text>
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

export default Shop_Profile_Screen
