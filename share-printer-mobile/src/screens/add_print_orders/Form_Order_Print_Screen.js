import React, { useState, useEffect } from "react"
import { TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Text, View, ScrollView, Picker } from "react-native"
import Constants from "expo-constants"
import { Card, Title, Paragraph } from "react-native-paper"

import { Loading_Component, Error_Component } from "../../components"

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

function Form_Order_Print_Screen(props) {
  const [select_product, set_select_product] = useState([
    {
      "2f12710a-f518-48e4-beed-05f5fba81d7a": {
        display_name: "Print Warna A3 (Per Halaman)",
        price: 2000,
        description: "some description",
      },
    },
  ])
  const [data_product, set_data_product] = useState([])
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState(null)

  const [selectedValue, setSelectedValue] = useState("java")
  const [file_url_link, set_file_url_link] = useState(null)

  useEffect(() => {
    // set_loading(true)
    let bucket = []
    let data_products = data_backend.data.products
    // set_error(err)
    set_data_product(data_products)
  }, [])

  const go_to_current_orders = () => {
    props.navigation.navigate("Order Receipt")
  }
  const upload_your_pdf_file = () => {
    console.log("upload_your_pdf_file")
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.form_container}>
          <View style={styles.picker_container}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150, alignItems: "center" }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <ScrollView style={styles.scrollView}>
            {select_product.length === 0 ? (
              <>
                <Text>Choose your product</Text>
              </>
            ) : (
              select_product.map((product_detail) => {
                let uuid_product = Object.keys(product_detail)[0]
                let detail_product = Object.values(product_detail)[0]
                // console.log(product_detail)
                // console.log(uuid_product)
                // console.log(detail_product)
                return (
                  <>
                    <Card style={styles.form_card}>
                      <View style={styles.inputView}>
                        <TextInput style={styles.inputText} placeholder="Input quantity product here" placeholderTextColor="#003f5c" />
                      </View>
                      <Card.Content>
                        <Title>{detail_product.display_name}</Title>
                        <Paragraph>Harga : Rp {detail_product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00</Paragraph>
                        <Text>Total Harga : Rp {detail_product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00</Text>
                      </Card.Content>
                    </Card>
                  </>
                )
              })
            )}
          </ScrollView>
        </View>
        <View style={styles.bottom_screen_container}>
          <Text>Your PDF file link here:</Text>
          {file_url_link !== undefined ? (
            <Text>Click this link to see your link PDF here</Text>
          ) : (
            <Text>Your PDF URL link download will be displayed here</Text>
          )}
          <TouchableOpacity onPress={upload_your_pdf_file} style={styles.button}>
            <Text style={styles.button_text}>Upload PDF File</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={go_to_current_orders} style={styles.button}>
            <Text style={styles.button_text}>Confirm Print Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  form_container: {
    flex: 3,
    marginTop: Constants.statusBarHeight,
  },
  picker_container: {
    alignItems: "center",
  },
  bottom_screen_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  form_card: {
    margin: 10,
    alignItems: "center",
  },
  inputView: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
  },
  inputText: {
    height: 30,
    color: "black",
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

export default Form_Order_Print_Screen
