import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

function Form_Print_Order_Screen(props) {
  const go_to_current_orders = () => {
    props.navigation.navigate("Order Receipt")
  }
  const upload_your_pdf_file = () => {
    console.log("upload_your_pdf_file")
  }
  return (
    <View style={styles.container}>
      <Text>Order Number : UUID</Text>
      <Text>Fill out form using select here</Text>
      <TouchableOpacity onPress={upload_your_pdf_file} style={styles.button}>
        <Text style={styles.button_text}>Upload PDF File</Text>
      </TouchableOpacity>
      <Text>Upload your PDF File</Text>
      <TouchableOpacity onPress={go_to_current_orders} style={styles.button}>
        <Text style={styles.button_text}>Confirm Print Order</Text>
      </TouchableOpacity>
      <Text>Form_Print_Order_Screen</Text>
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

export default Form_Print_Order_Screen
