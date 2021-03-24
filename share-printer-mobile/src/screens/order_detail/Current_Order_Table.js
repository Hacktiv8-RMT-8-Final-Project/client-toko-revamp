import React, { useState, useEffect } from "react"
import { AsyncStorage, TouchableOpacity, StyleSheet, Text, SafeAreaView, ScrollView, View, Alert, Modal, Pressable } from "react-native"

import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable, Provider, Portal } from "react-native-paper"

import * as DocumentPicker from "expo-document-picker"
import * as Linking from "expo-linking"
import Ionicons from "react-native-vector-icons/Ionicons"

import axios from "../../config/axios"
import app from "../../config/firebase"
import { useIsFocused } from "@react-navigation/native"

import { Loading_Component, Error_Component } from "../../components"

function Current_Orders_Screen(props) {
  let data_backend = {
    msg: "Successfully read your orders that are not completed",
    data: [
      {
        id: 2,
        order_number: "03ea8590-8912-11eb-a47c-477e9a2cdd7b",
        order_content: {
          data: [
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
        },
        files_url: "https://dummy.downloadlink.here",
        order_price: 10000,
        shop_Id: 1,
        email_user: "user@mail.com",
        payment_status: 1,
        proof_receipt_transaction: null,
        createdAt: "2021-03-20T00:20:03.306Z",
        updatedAt: "2021-03-20T00:20:03.306Z",
      },
    ],
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentOrders, setCurrentOrders] = useState([])

  const isFocused = useIsFocused()
  const [file_url_link, set_file_url_link] = useState(null)
  const [proof_transaction_link, set_proof_transaction_link] = useState(null)

  const [access_token, set_access_token] = useState("")
  useEffect(() => {
    const funcAsync = async () => {
      try {
        setLoading(true)
        await AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
        let response = await axios({
          method: "GET",
          url: `/user/status_orders`,
          headers: {
            access_token: access_token || "",
            "Content-Type": "application/json",
          },
        })
        setCurrentOrders(response.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    funcAsync()
  }, [file_url_link, proof_transaction_link, props, isFocused, access_token])

  const click_info_order = (data_order) => {
    // console.log(data_order)
    props.navigation.navigate("Order Detail", { data: data_order, from_page: "current_order" })
  }

  const upload_your_pdf_file = async (order_id) => {
    console.log(`upload pdf button`)

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

      console.log("upload a new PDF File")
      // ! need to print file into data base
      let input_data = {
        links_url: url,
        order_Id: order_id,
      }
      const response = await axios({
        method: "PUT",
        url: `/user/upload_pdf`,
        headers: {
          access_token: access_token || "",
          "Content-Type": "application/json",
        },
        data: input_data,
      })
      // console.log(response)
    } catch (err) {
      console.log(err)
      // setError(err)
    }
  }

  const upload_proof_transaction = async (order_id) => {
    console.log(`upload file button`)
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

      console.log("upload a new PDF File")
      // ! need to print file into data base
      let input_data = {
        proof_receipt_transaction: url,
        order_Id: order_id,
      }
      const response = await axios({
        method: "PUT",
        url: `/user/upload_receipt`,
        headers: {
          access_token: access_token || "",
          "Content-Type": "application/json",
        },
        data: input_data,
      })
      // console.log(response)
    } catch (err) {
      console.log(err)
      // setError(err)
    }
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />
  // console.log(currentOrders, "ini curr orders")
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>CURRENT ORDERS</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {/* <Text>{JSON.stringify(currentOrders)}</Text> */}
          {currentOrders.length === 0 ? (
            <Card style={styles.card_order}>
              <Card.Content style={{ alignItems: "center", textAlign: "center" }}>
                <Text>Your current orders are empty</Text>
              </Card.Content>
            </Card>
          ) : (
            currentOrders.map((e) => {
              return (
                <Card style={styles.card_order} key={e.id}>
                  <Card.Content>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        {/* // ! Store and Price */}
                        <TouchableOpacity onPress={() => click_info_order(e)} style={styles.button_info}>
                          <Text>
                            &nbsp; &nbsp;
                            <Ionicons style={styles.icon} name={"information-circle-outline"} />
                            &nbsp;Order Info
                          </Text>
                        </TouchableOpacity>
                        <Paragraph>
                          <Ionicons style={styles.icon} name={"home-outline"} /> <Text style={styles.text_bold}>{e.Shop.name}</Text>
                        </Paragraph>
                        {e.proof_receipt_transaction !== null ? (
                          <Paragraph style={{ color: "green" }}>
                            <Ionicons style={styles.icon} name={"card-outline"} /> Rp {e.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ,00
                          </Paragraph>
                        ) : (
                          <Paragraph style={{ color: "red" }}>
                            <Ionicons style={styles.icon} name={"card-outline"} /> Rp {e.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ,00
                          </Paragraph>
                        )}
                      </View>
                      <View style={styles.rightContent}>
                        {e.payment_status === 1 ? (
                          <Chip style={{ backgroundColor: "#90E3FF" }} icon="bell-circle-outline" type="outlined">
                            Status Requested
                          </Chip>
                        ) : e.payment_status === 2 ? (
                          <Chip
                            style={{ backgroundColor: "#ffffff", borderWidth: 1, borderColor: "green" }}
                            icon="checkbox-marked-circle-outline"
                            type="outlined"
                          >
                            Status Paid
                          </Chip>
                        ) : e.payment_status === 3 ? (
                          <Chip style={{ backgroundColor: "#04f700" }} icon="check-underline-circle-outline" type="outlined">
                            Order Confirmed
                          </Chip>
                        ) : e.payment_status === 4 ? (
                          <Chip style={{ backgroundColor: "#ffd900" }} icon="circle-slice-3" type="outlined">
                            In Progress
                          </Chip>
                        ) : e.payment_status === 5 ? (
                          <Chip style={{ backgroundColor: "#D9AD82" }} icon="check-circle-outline" type="outlined">
                            Completed
                          </Chip>
                        ) : e.payment_status === 6 ? (
                          <Chip style={{ backgroundColor: "#FF9090" }} icon="close-circle-outline" type="outlined">
                            Canceled
                          </Chip>
                        ) : e.payment_status === 7 ? (
                          <Chip style={{ backgroundColor: "#FF9090" }} icon="minus-circle-outline" type="outlined">
                            Rejected
                          </Chip>
                        ) : (
                          <Chip style={{ backgroundColor: "red" }} icon="alert-circle-outline" type="outlined">
                            Error
                          </Chip>
                        )}
                      </View>
                    </View>
                  </Card.Content>
                  <Card.Actions></Card.Actions>
                </Card>
              )
            })
          )}
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
  title_container: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 10,
  },
  title_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card_order: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 25,
  },
  current_order_container: {
    maxHeight: 50,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 14,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 1,
    width: 150,
  },
  rightContent: {
    flex: 1,
    width: 150,
    justifyContent: "center",
  },
  uuid: {
    fontSize: 18,
  },
  button_upload_pdf: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: "#99AC5D",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  button_upload_receipt: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: "#D9AD82",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  info_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button_transaction_not_paid: {
    fontSize: 12,
    padding: 3,
    paddingLeft: 7,
    width: 125,
    borderRadius: 25,
    // backgroundColor: "grey",
    margin: 3,
    marginTop: 5,
  },
  button_transaction: {
    fontSize: 12,
    padding: 3,
    paddingLeft: 7,
    width: 120,
    borderRadius: 25,
    // backgroundColor: "#9FFF90",
    margin: 3,
    marginTop: 5,
    // borderColor: "#9FFF90",
    // borderWidth: 5,
  },
  button_info: {
    fontSize: 12,
    padding: 3,
    width: 120,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    borderColor: "grey",
    borderWidth: 1,
    textAlign: "center",
  },
  button_download: {
    fontSize: 12,
    padding: 3,
    paddingLeft: 7,
    width: 75,
    borderRadius: 200,
    backgroundColor: "#b4c247",
    margin: 3,
    borderColor: "#D9AD82",
    borderWidth: 1,
  },
  text_bold: {
    fontWeight: "bold",
  },
  icon: {
    fontSize: 17,
    marginBottom: 5,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
})
export default Current_Orders_Screen
