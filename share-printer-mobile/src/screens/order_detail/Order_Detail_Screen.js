import React, { useState, useEffect } from "react"
import { TouchableOpacity, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Card, Title, Paragraph, DataTable } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Ionicons"

import { Loading_Component, Error_Component } from "../../components"

import * as DocumentPicker from "expo-document-picker"
import * as Linking from "expo-linking"

import { AsyncStorage } from "react-native"
import axios from "../../config/axios"
import app from "../../config/firebase"

function Order_Detail_Screen(props) {
  console.log(props)
  // console.log(props.route.params.data)

  const [from_page, set_from_page] = useState(props.route.params.from_page)
  const [data_receipt, set_data_shop] = useState(props.route.params.data)
  // const [shop_id, set_shop_id] = useState(props.route.params.shop_id)
  // const [data_receipt, set_data_receipt] = useState(props.route.params.receipt)

  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState(null)

  // const [proof_transaction_link, set_proof_transaction_link] = useState(null)

  const [access_token, set_access_token] = useState("")
  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
  }, [])

  const upload_your_proof_receipt_transaction = async () => {
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
      set_proof_transaction_link(url)
      console.log("upload File")
      // ! Printed into database after upload
      const input = {
        proof_receipt_transaction: url,
        order_Id: data_receipt.id,
      }
      const response = await axios({
        method: "PUT",
        url: `/user/upload_receipt`,
        headers: {
          access_token: access_token || "",
          "Content-Type": "application/json",
        },
        data: input,
      })
      console.log(response.data.data[0].proof_receipt_transaction)
    } catch (err) {
      console.log(err)
      // setError(err)
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

  const go_to_your_print_order_List = () => {
    props.navigation.goBack()
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.table_scroll_container}>
          <ScrollView>
            {/* <Text>{JSON.stringify(data_receipt)}</Text> */}
            <Card style={styles.form_card}>
              <Card.Content>
                <Title style={styles.uuid}>{data_receipt.Shop.name} </Title>
                <Paragraph style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Order Number : <Paragraph>{data_receipt.order_number}</Paragraph>
                </Paragraph>
                <Paragraph style={{ marginBottom: 10 }}>
                  <Paragraph style={{ fontWeight: "bold" }}>Date : </Paragraph>
                  {data_receipt.updatedAt.slice(0, 10)}
                </Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>Selected Products :</Paragraph>
                {data_receipt.order_content.map((product, index) => {
                  // console.log(product)
                  let uuid_product = Object.keys(product)[0]
                  let detail_product = Object.values(product)[0]
                  return (
                    <Card style={styles.form_card_product} key={index}>
                      <Card.Content>
                        <View style={styles.content}>
                          <View style={styles.leftContent}>
                            <Text style={styles.text_bold}>
                              {detail_product.amount} pcs x {detail_product.display_name}
                            </Text>
                            <Text>{detail_product.description}</Text>
                          </View>
                          <View style={styles.rightContent}>
                            <Text style={styles.rightContent_left}>Rp</Text>
                            <Text style={styles.rightContent_right}>
                              {(detail_product.price * detail_product.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              ,00
                            </Text>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  )
                })}
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                />
                <Card style={styles.form_card_product}>
                  <Card.Content>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        <Text style={styles.text_bold}>Total Price</Text>
                      </View>
                      <View style={styles.rightContent}>
                        <Text style={styles.rightContent_left}>Rp</Text>
                        <Text style={styles.rightContent_right}>
                          {data_receipt.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ,00
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </Card.Content>
              {from_page === "current_order" ? (
                <>
                  <TouchableOpacity onPress={upload_your_pdf_file} style={styles.buttonUploadPayment}>
                    <Text style={styles.button_text}>
                      <Ionicons style={{ fontSize: 20 }} name={"cloud-upload"} /> Reupload PDF File
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={upload_your_proof_receipt_transaction} style={styles.buttonUploadTransaction}>
                    <Text style={styles.button_text}>
                      <Ionicons style={{ fontSize: 20 }} name={"cloud-upload"} /> Reupload Transaction
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </Card>
          </ScrollView>
        </View>
        <View style={styles.bottom_screen_container}>
          {from_page === "current_order" ? (
            <>
              <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
                <Text style={styles.button_text}>Back to Orders list</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
                <Text style={styles.button_text}>Back to History list</Text>
              </TouchableOpacity>
            </>
          )}
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
  table_scroll_container: {
    flex: 7,
    marginHorizontal: 20,
  },
  scroll_view_screen: {
    marginHorizontal: 20,
  },
  form_card: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    marginVertical: 10,
    paddingVertical: 10,
  },
  form_card_product: {
    backgroundColor: "#ffffff",
  },
  bottom_screen_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  text_bold: {
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 2,
    // backgroundColor: "red",
  },
  rightContent: {
    flex: 1.2,
    flexDirection: "row",
    // backgroundColor: "blue",
    alignItems: "center",
  },
  rightContent_left: {
    flex: 0.3,
    // backgroundColor: "green",
  },
  rightContent_right: {
    flex: 0.9,
    // backgroundColor: "white",
    justifyContent: "flex-end",
    textAlign: "right",
  },

  button_upload: {
    width: "80%",
    backgroundColor: "#107C10",
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
    backgroundColor: "#107C10",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "black",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  uuid: {
    fontSize: 18,
  },

  buttonUploadPayment: {
    width: "80%",
    backgroundColor: "#25D366",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "black",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonUploadTransaction: {
    width: "80%",
    backgroundColor: "#107C10",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "black",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
})

export default Order_Detail_Screen
