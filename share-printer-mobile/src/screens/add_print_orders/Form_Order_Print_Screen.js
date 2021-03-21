import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Card, Title, Paragraph } from "react-native-paper"

let data_backend = {
  msg: "Successfully read shop details",
  data: {
    id: 1,
    name: "toko printer",
    products: [
      {
        "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
          display_name: "Jilid - A3",
          price: 5000,
          description: "some description",
        },
      },
      {
        "2f12710a-f518-48e4-beed-05f5fba81d7a": {
          display_name: "Print Warna A3 (Per Halaman)",
          price: 2000,
          description: "some description",
        },
      },
    ],
    location: "{id: 0, lat: -6.2041139879292135, lng: 106.8042508374194}",
    status_open: true,
    email: "printer@mail.com",
    password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
    createdAt: "2021-03-21T00:41:34.009Z",
    updatedAt: "2021-03-21T11:54:31.623Z",
  },
}

function Form_Print_Order_Screen(props) {
  const [select_product, set_select_product] = useState([])

  const go_to_current_orders = () => {
    props.navigation.navigate("Order Receipt")
  }
  const upload_your_pdf_file = () => {
    console.log("upload_your_pdf_file")
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Card style={styles.form_card}>
              <Card.Content>
                <Title>Form Order Print</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Text>test</Text>
              </Card.Actions>
            </Card>
            <View style={styles.button_container}>
              <TouchableOpacity onPress={upload_your_pdf_file} style={styles.button}>
                <Text style={styles.button_text}>Upload PDF File</Text>
              </TouchableOpacity>

              <Text>Your PDF file link here:</Text>
              <Text>XXX</Text>

              <TouchableOpacity onPress={go_to_current_orders} style={styles.button}>
                <Text style={styles.button_text}>Confirm Print Order</Text>
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

export default Form_Print_Order_Screen
