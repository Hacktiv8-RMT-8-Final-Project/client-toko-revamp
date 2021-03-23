import React, { useState, useEffect } from "react"
import { TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Text, View, ScrollView, Picker, Alert } from "react-native"
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
  const [select_product, set_select_product] = useState([])
  const [data_product, set_data_product] = useState([])

  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState(null)
  const [shopDetail, setShopDetail] = useState(props.route.params.shop)

  const [selectedValue, setSelectedValue] = useState(null)
  const [file_url_link, set_file_url_link] = useState(null)
  const [total_price, set_total_price] = useState(0)

  useEffect(() => {
    set_data_product(shopDetail.products)
  }, [])

  useEffect(() => {
    let temp_total_price = 0
    select_product.map((e) => {
      let value = Object.values(e)[0]
      let total_per_item = value.amount * value.price
      temp_total_price += total_per_item
    })
    set_total_price(temp_total_price)
    return () => {}
  }, [select_product])

  const on_change_picker = (product) => {
    const new_selected_product = [...select_product]
    // console.log(product)
    let key = Object.keys(product)[0]
    let objProduct = { ...product }
    objProduct[key].amount = 0
    // console.log(objProduct)
    // new_selected_product.push({ ...product, amount: 0 })
    set_select_product([...select_product, objProduct])
  }

  const set_amount = (text, uuid_product) => {
    const new_selected_product = [...select_product]
    // console.log(text, uuid_product)
    // console.log(new_selected_product)
    new_selected_product.map((detail_product) => {
      // console.log(detail_product, `<<<`)
      let key = Object.keys(detail_product)[0]
      let objProduct = { ...detail_product }
      // console.log(key)
      if (key === uuid_product) {
        objProduct[key].amount = +text
      }
      // console.log(objProduct, `<<<`)
    })
    set_select_product(new_selected_product)
  }

  const remove_product = (uuid_product) => {
    console.log(uuid_product)
    Alert.alert(
      "Delete selected product?",
      "You can re add it again",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const existing_selected_product = [...select_product]
            const updated_product_finder = existing_selected_product.filter((product) => {
              let key = Object.keys(product)[0]
              if (key !== uuid_product) return product
            })
            set_select_product(updated_product_finder)
          },
        },
      ],
      { cancelable: false }
    )
    // ! without alert
    // const existing_selected_product = [...select_product]
    // // console.log(existing_selected_product)
    // const updated_product_finder = existing_selected_product.filter((product) => {
    //   let key = Object.keys(product)[0]
    //   // console.log(product)
    //   if (key !== uuid_product) return product
    // })
    // set_select_product(updated_product_finder)
  }

  const submit_form = () => {
    console.log(`submit here`)
    console.log(select_product)
    // props.navigation.navigate("Order Receipt")
  }
  const upload_your_pdf_file = () => {
    console.log("upload_your_pdf_file")
    // set_file_url_link()
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
              style={styles.picker_select}
              onValueChange={(data_product, index) => on_change_picker(data_product)}
            >
              <Picker.Item label="Choose product service here" enabled={false} />
              {data_product.map((e, index) => {
                let detail_product = Object.values(e)[0]
                return <Picker.Item key={index} label={detail_product.display_name} value={e} />
              })}
            </Picker>
          </View>
          <ScrollView style={styles.scrollView}>
            {select_product.length === 0 ? (
              <>
                <Card style={styles.form_card}>
                  <Card.Content>
                    <Title>Your orders will be displayed here</Title>
                  </Card.Content>
                </Card>
              </>
            ) : (
              select_product.map((product_detail, index) => {
                let uuid_product = Object.keys(product_detail)[0]
                let detail_product = Object.values(product_detail)[0]
                return (
                  <Card style={styles.form_card} key={index}>
                    <View style={styles.inputView}>
                      <TextInput
                        onChangeText={(text) => set_amount(text, uuid_product)}
                        style={styles.inputText}
                        placeholder="Input quantity product here"
                        placeholderTextColor="#003f5c"
                        keyboardType="numeric"
                        value={detail_product.amount}
                      />
                    </View>
                    <Card.Content>
                      <Title>{detail_product.display_name}</Title>
                      <Paragraph>Price : Rp {detail_product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00</Paragraph>
                      <TouchableOpacity onPress={() => remove_product(uuid_product)} style={styles.remove_product_button}>
                        <Text style={styles.button_text}>Remove product</Text>
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                )
              })
            )}
          </ScrollView>
        </View>
        <View style={styles.bottom_screen_container}>
          <Text>Your PDF file link here :</Text>
          {file_url_link === null ? (
            <>
              <Text>Your PDF URL link download will be displayed here</Text>
            </>
          ) : (
            <>
              <Text style={{ color: "blue" }} onPress={() => Linking.openURL("http://google.com")}>
                File PDF
              </Text>
            </>
          )}
          <TouchableOpacity onPress={upload_your_pdf_file} style={styles.upload_button}>
            <Text style={styles.button_text}>Upload PDF File</Text>
          </TouchableOpacity>

          <Text>Total order price :</Text>
          {total_price === 0 ? <Text>Rp 0,00</Text> : <Text>Rp {total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 </Text>}

          <TouchableOpacity onPress={submit_form} style={styles.button}>
            <Text style={styles.button_text}>Confirm Order Print</Text>
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
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 30,
  },
  picker_select: {
    width: 250,
    height: 44,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  bottom_screen_container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  scrollViewBottom: {
    marginHorizontal: 0,
  },
  form_card: {
    flex: 1,
    margin: 10,
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
  remove_product_button: {
    width: "80%",
    backgroundColor: "#FF9C72",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
  },
  upload_button: {
    width: "80%",
    backgroundColor: "#FFDC72",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
  },
  button: {
    width: "80%",
    backgroundColor: "#A7FF72",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Form_Order_Print_Screen
