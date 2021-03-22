import * as DocumentPicker from 'expo-document-picker';
import app from '../../firebaseConfig/base'
import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Card, Title, Paragraph } from "react-native-paper"

let data_backend = {
  id: 1,
  order_number: "b502c1b0-8a22-11eb-9b29-d3d44b288eb1",
  order_content: [
    {
      "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
        display_name: "Jilid - A3",
        price: 5000,
        description: "hardcover",
      },
    },
    {
      "2f12710a-f518-48e4-beed-05f5fba81d7a": {
        display_name: "Print Warna A3 (Per Halaman)",
        price: 2000,
        description: "50% coverage color minimal",
      },
    },
  ],
  files_url: "https://dummy.downloadlink.here",
  order_price: 10000,
  shop_Id: 1,
  email_user: "user@mail.com",
  payment_status: 1,
  proof_receipt_transaction: null,
  createdAt: "2021-03-21T08:52:03.532Z",
  updatedAt: "2021-03-21T08:52:03.532Z",
}

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
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Card style={styles.form_card}>
              <Card.Content>
                <Title>Your Order Receipt</Title>
                <Paragraph>UUID</Paragraph>
                <Text></Text>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
            <View style={styles.button_container}>
              <TouchableOpacity onPress={upload_your_proof_receipt_transaction} style={styles.button}>
                <Text style={styles.button_text}>Upload Payment Transaction</Text>
              </TouchableOpacity>

              <Text>Your proof receipt payment transaction here:</Text>
              <Text>XXX</Text>

              <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
                <Text style={styles.button_text}>Show Status Orders</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  form_card: {
    margin: 10,
  },
  button_container: {
    alignItems: "center",
  },

  button: {
    width: "80%",
    backgroundColor: "#cdcdcd",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
  },
})

export default Checkout_Order_Screen

// import React from "react"
// import { TouchableOpacity, StyleSheet, Text, View } from "react-native"
// import { Card, Title, Paragraph } from "react-native-paper"

// function Checkout_Order_Screen(props) {
//   const upload_your_proof_receipt_transaction = () => {
//     console.log(`upload_your_proof_receipt_transaction`)
//   }
//   const go_to_your_print_order_List = () => {
//     props.navigation.navigate("Current Orders")
//   }
//   return (
//     <View style={styles.container}>
//       <Text>Show print order card here!</Text>
//       <Card style={styles.form_card}>
//         <Card.Content>
//           <Title>Form Order Print</Title>
//           <Paragraph>Card content</Paragraph>
//         </Card.Content>
//         <Card.Actions>
//           <Text>test</Text>
//         </Card.Actions>
//       </Card>
// <TouchableOpacity onPress={upload_your_proof_receipt_transaction} style={styles.button}>
//   <Text style={styles.button_text}>Upload Payment Transaction</Text>
// </TouchableOpacity>

// <Text>Your proof receipt payment transaction here:</Text>
// <Text>XXX</Text>

// <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
//   <Text style={styles.button_text}>Show Status Orders</Text>
// </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },

//   button: {
//     width: "80%",
//     backgroundColor: "#cdcdcd",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     marginBottom: 10,
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   button_text: {
//     fontSize: 16,
//     textTransform: "uppercase",
//   },
// })

// export default Checkout_Order_Screen
