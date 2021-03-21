import React from "react"
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"

import MapView from "react-native-maps"

function Google_Map_Shop_Screen(props) {
  const confirm_choose_shop = () => {
    props.navigation.navigate("Shop Profile")
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_map}>
          <MapView style={styles.map} />
        </View>
        <View style={styles.container_shop}>
          <TouchableOpacity onPress={confirm_choose_shop} style={styles.registerBtn}>
            <Text style={styles.button_text}>Confirm Shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_map: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container_shop: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
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
