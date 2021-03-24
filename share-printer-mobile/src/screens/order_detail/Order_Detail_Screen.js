import React from "react"
import { AsyncStorage } from "react-native"
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native"
import { Divider } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Ionicons"

function Order_Detail_Screen(props) {
  console.log(props)
  return (
    <>
      <View style={styles.container}>
        <Text>tes</Text>
      </View>
    </>
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
    backgroundColor: "#D4A373",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  photo: {
    marginBottom: 17,
    width: 230,
    height: 230,
    borderRadius: 200,
    borderColor: "white",
    borderWidth: 7,
  },
  name: {
    marginBottom: 2,
    fontSize: 30,
  },
  email: {
    marginBottom: 20,
    fontSize: 20,
  },
  setting: {
    fontSize: 17,
    marginBottom: 7,
    borderWidth: 1,
    padding: 3,
    paddingLeft: 7,
    width: 165,
    borderRadius: 200,
  },
  icon: {
    fontSize: 17,
    marginBottom: 5,
  },
})

export default Order_Detail_Screen
