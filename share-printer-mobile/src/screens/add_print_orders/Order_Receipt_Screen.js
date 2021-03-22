import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"
import * as DocumentPicker from 'expo-document-picker';
import app from '../../firebaseConfig/base'

function Checkout_Order_Screen(props) {

  const upload_your_proof_receipt_transaction = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync()
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', file.uri, true);
        xhr.send(null);
      });
      const storageRef = await app.storage().ref()
      const bucket = storageRef.child(file.name)
      await bucket.put(blob)
      const url = await bucket.getDownloadURL()
      console.log(url)
      console.log('upload Receipt Order')
    } catch(err) {
      console.log(err)
    }
  }
  const go_to_your_print_order_List = () => {
    props.navigation.navigate("Current Orders")
  }
  return (
    <View style={styles.container}>
      <Text>Show print order card here!</Text>

      <TouchableOpacity onPress={upload_your_proof_receipt_transaction} style={styles.button}>
        <Text style={styles.button_text}>Upload Payment Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
        <Text style={styles.button_text}>Show Status Orders</Text>
      </TouchableOpacity>
      <Text>Checkout_Order_Screen!</Text>
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

export default Checkout_Order_Screen
