import React, { useState, useEffect } from "react"
import { TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Text, View, ScrollView, Picker, Alert } from "react-native"
import Constants from "expo-constants"
import { Card, Title, Paragraph, Divider } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Ionicons"

import * as DocumentPicker from "expo-document-picker"
import * as Linking from "expo-linking"

import { AsyncStorage } from "react-native"
import axios from "../../config/axios"
import app from "../../config/firebase"

import { Loading_Component, Error_Component } from "../../components"

function Form_Order_Print_Screen(props) {
  const [select_product, set_select_product] = useState([])
  const [data_product, set_data_product] = useState([])

  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState(null)
  const [shopDetail, setShopDetail] = useState(props.route.params.shop)

  const [selectedValue, setSelectedValue] = useState(null)
  const [file_url_link, set_file_url_link] = useState(null)
  const [total_price, set_total_price] = useState(0)

  const [access_token, set_access_token] = useState("")
  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
  }, [])

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

  const on_change_picker = (product, index) => {
    // const new_selected_product = [...select_product]
    let key = Object.keys(product)[0]
    let objProduct = {}
    objProduct[key + index] = { ...product[key] }
    objProduct[key + index].amount = 1
    // new_selected_product.push({ ...product, amount: 0 })
    set_select_product([...select_product, objProduct])
  }

  const set_amount = (text, uuid_product, indexProd) => {
    const new_selected_product = [...select_product]
    new_selected_product.forEach((detail_product, index) => {
      let key = Object.keys(detail_product)[0]
      let objProduct = { ...detail_product }
      if (indexProd === index) {
        objProduct[key].amount = +text
      }
    })
    console.log(new_selected_product)
    set_select_product(new_selected_product)
  }

  const remove_product = (uuid_product, indexProd) => {
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
            const updated_product_finder = existing_selected_product.filter((product, index) => {
              let key = Object.keys(product)[0]
              if (indexProd !== index) return product
            })
            // console.log(updated_product_finder)
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
    const convert_order_product = JSON.stringify(select_product)

    let error_bucket = []
    if (!file_url_link) error_bucket.push("Please input your download file link")
    if (!convert_order_product) error_bucket.push("Please input order requirement")
    if (total_price === 0) error_bucket.push("Please add an item")
    if (error_bucket.length > 0) {
      Alert.alert(
        "Input field form required",
        "Please fill all requirement for your checkout including your file",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      )
    } else {
      let input_data = {
        files_url: file_url_link,
        order_content: convert_order_product,
        shop_Id: +shopDetail.id,
        order_price: +total_price,
      }
      // console.log(input_data)
      // props.navigation.navigate("Order Receipt", { receipt: select_product })
      axios({
        method: "POST",
        url: `/user/form`,
        headers: {
          access_token: access_token || "",
          "Content-Type": "application/json",
        },
        data: input_data,
      })
        .then((response) => {
          // console.log(response.data.data)
          let created_receipt_data = response.data.data
          props.navigation.navigate("Order Receipt", { receipt: created_receipt_data, shop_name: shopDetail.name, shop_id: shopDetail.id })
        })
        .catch((err) => {
          console.log(err)
          // setError(err)
        })
    }
  }

  const upload_your_pdf_file = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync()
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function (e) {
          console.log(e)
          reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", file.uri, true)
        xhr.send(null)
      })
      const storageRef = await app.storage().ref()
      const bucket = storageRef.child(file.name)
      await bucket.put(blob)
      const url = await bucket.getDownloadURL()
      console.log(url)
      set_file_url_link(url)
      console.log("upload File")
    } catch (err) {
      console.log(err)
      // setError(err)
    }
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.form_container}>
          {/*  */}
          <View style={styles.upload_container}>
            <TouchableOpacity onPress={upload_your_pdf_file} style={styles.button_upload}>
              <Text style={styles.button_text}>
                <Ionicons style={{ fontSize: 20 }} name={"cloud-upload"} /> Upload PDF File
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 11, marginBottom: 10 }}>*You can only upload .pdf file with maximum 20 MB size</Text>
          </View>

          <View style={styles.picker_container}>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker_select}
              onValueChange={(data_product, index) => on_change_picker(data_product, index)}
            >
              <Picker.Item label="CHOOSE SHOP PRODUCTS" enabled={false} />
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
                  <Card.Content style={{ alignItems: "center", textAlign: "center" }}>
                    <Text>Your orders will be displayed here</Text>
                  </Card.Content>
                </Card>
              </>
            ) : (
              select_product.map((product_detail, index) => {
                let uuid_product = Object.keys(product_detail)[0]
                let detail_product = Object.values(product_detail)[0]
                return (
                  <Card style={styles.form_card} key={index}>
                    <Card.Content style={styles.cardContent}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          {/* <Text style={{ fontWeight: "bold", marginTop: 7, marginRight: 10 }}>Amount:</Text> */}
                          <View style={styles.inputView}>
                            <TextInput
                              onChangeText={(text) => set_amount(text, uuid_product, index)}
                              style={styles.inputText}
                              placeholder="Input quantity product here"
                              placeholderTextColor="#003f5c"
                              keyboardType="numeric"
                              value={detail_product.amount.toString()}
                            />
                          </View>
                          <Text style={{ fontWeight: "bold", marginTop: 7, marginRight: 10 }}>&nbsp;&nbsp;pcs. {detail_product.display_name}</Text>
                        </View>

                        <View style={{ flex: 1, backgroundColor: "white" }}>
                          <Text>{detail_product.description}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <Text>Price : </Text>
                          <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                            Rp {detail_product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00
                          </Text>
                        </View>
                      </View>
                      {/*  */}
                      <TouchableOpacity style={{ position: "relative", top: 5, right: 5 }} onPress={() => remove_product(uuid_product, index)}>
                        <Ionicons style={{ fontSize: 30, color: "red" }} name={"close-circle-outline"} />
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                )
              })
            )}
          </ScrollView>
        </View>
        <View style={styles.bottom_screen_container}>
          {file_url_link === null ? (
            <>
              <Text style={{ marginVertical: 5 }}>
                <Ionicons style={styles.icon} name={"close-circle-outline"} />
                &nbsp;No file uploaded
              </Text>
            </>
          ) : (
            <>
              <Text style={{ marginVertical: 5 }}>
                <Ionicons style={styles.icon} name={"checkmark-circle-outline"} />
                &nbsp;File PDF uploaded
              </Text>
              {/* <Text style={{ color: "blue" }} onPress={() => Linking.openURL(`${file_url_link}`)}>
                You can download link PDF File
              </Text> */}
            </>
          )}

          {/* <TouchableOpacity onPress={upload_your_pdf_file} style={styles.button_upload}>
            <Text style={styles.button_text}>
              <Ionicons style={{ fontSize: 20 }} name={"cloud-upload"} /> Upload PDF File
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 11, marginBottom: 10 }}>*You can only upload .pdf file with maximum 20 MB size</Text> */}

          <View style={styles.totalPriceContainer}>
            <Text>Total order price :</Text>
            {total_price === 0 ? (
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Rp 0,00</Text>
            ) : (
              <Text style={{ fontWeight: "bold" }}>Rp {total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 </Text>
            )}
          </View>

          <TouchableOpacity onPress={submit_form} style={styles.button}>
            <Text style={styles.button_text}>Confirm Order</Text>
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
    flex: 4,
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
  },
  cardContent: {
    flexDirection: "row",
  },
  bottom_screen_container: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
    // backgroundColor: "#ffffff",
  },
  upload_container: {
    alignItems: "center",
  },
  picker_container: {
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 30,
    backgroundColor: "#d4a373",
    borderWidth: 1,
    borderColor: "#3e2913",
  },
  picker_select: {
    width: 275,
    height: 44,
    textAlign: "center",
    justifyContent: "center",
    color: "white",
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
    // backgroundColor: "#ffffff",
    borderRadius: 25,
  },
  inputView: {
    width: 50,
    // backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    borderWidth: 1,
  },
  inputText: {
    height: 30,
    color: "black",
    textAlign: "center",
  },
  remove_product_button: {
    width: "80%",
    backgroundColor: "#FF9C72",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
  button_upload: {
    width: "80%",
    // backgroundColor: "#CCD5AE",
    backgroundColor: "#99AC5D",
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
    backgroundColor: "#d4a373",
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
    color: "white",
    fontWeight: "bold",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "grey",
    borderTopColor: "grey",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  upload: {
    width: 20,
    height: 20,
  },
})

export default Form_Order_Print_Screen
