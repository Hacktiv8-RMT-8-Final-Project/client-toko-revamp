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
  // console.log(props.route.params)

  const [shop_name, set_shop_name] = useState(props.route.params.shop_name)
  const [shop_id, set_shop_id] = useState(props.route.params.shop_id)
  const [data_receipt, set_data_receipt] = useState(props.route.params.receipt)

  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState(null)

  const [proof_transaction_link, set_proof_transaction_link] = useState(null)

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

  const go_to_your_print_order_List = () => {
    props.navigation.navigate("Current Orders")
  }

  function go_to_payment_methods_page () {
    props.navigation.navigate('Payment Methods')
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.table_scroll_container}>
          <ScrollView>
            <Card style={styles.form_card}>
              <Card.Content>
                <Title style={styles.uuid}>Order Number: </Title>
                <Paragraph>{data_receipt.order_number}</Paragraph>
                <Paragraph>Store: {shop_name}</Paragraph>
                <Paragraph>Date: {data_receipt.updatedAt.slice(0, 10)}</Paragraph>
                {proof_transaction_link === null ? (
                    <>
                      <Text style={{marginTop: 5}}>Status Unpaid</Text>
                    </>
                  ) : (
                    <>
                      <Text style={{marginTop: 5, color: "blue" }} onPress={() => Linking.openURL(`${data_receipt.proof_receipt_transaction}`)}>
                        File Proof of Transaction
                      </Text>
                    </>
                  )}
                {/* <View style={styles.paymentMethods}>
                  <Paragraph style={{fontWeight: 'bold'}}>Payment Methods</Paragraph>
                  <Paragraph style={{fontWeight: 'bold'}}>BCA</Paragraph>
                  <Paragraph>8610941177 a/n PT Delta Neva Angkasa</Paragraph>
                  <Paragraph>or</Paragraph>
                  <Paragraph style={{fontWeight: 'bold'}}>Mandiri</Paragraph>
                  <Paragraph>1370012937096 a/n PT Delta Neva Angkasa</Paragraph>
                </View> */}
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Product</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                    {/* <DataTable.Title>Description</DataTable.Title> */}
                  </DataTable.Header>

                  {data_receipt.order_content.map((e, index) => {
                    let temp = Object.keys(e)
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>
                          {e[temp].amount} x {e[temp].display_name}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          <Text>Rp {e[temp].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}
                  <DataTable.Row style={{ borderTopWidth: 2 }}>
                    <DataTable.Cell>Total Price</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text style={{fontWeight:'bold'}}>Rp {data_receipt.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
          </ScrollView>
        </View>
        <View style={styles.bottom_screen_container}>
          <View style={styles.paymentMethods}>
          <TouchableOpacity onPress={go_to_payment_methods_page}>
          <Text style={{marginTop: 5, color: "blue", marginBottom:20 }} >
              Payment Methods
            </Text>
          </TouchableOpacity>
            
          </View>
          {/* {proof_transaction_link === null ? (
            <>
              <Text style={{marginTop: 5}}>Status Unpaid</Text>
            </>
          ) : (
            <>
              <Text style={{marginTop: 5, color: "blue" }} onPress={() => Linking.openURL(`${data_receipt.proof_receipt_transaction}`)}>
                File Proof of Transaction
              </Text>
            </>
          )} */}
          <TouchableOpacity onPress={upload_your_proof_receipt_transaction} style={styles.button_upload}>
            <Text style={styles.button_text}>
              <Ionicons style={{ fontSize: 20 }} name={"cloud-upload"} /> Upload Proof Transaction
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 11, marginBottom: 10 }}>*You can provide transaction later at Your Current Orders Tab</Text>

          <TouchableOpacity onPress={go_to_your_print_order_List} style={styles.button}>
            <Text style={styles.button_text}>Show Status Orders</Text>
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
  table_scroll_container: {
    flex: 3,
    marginHorizontal: 20,
  },
  scroll_view_screen: {
    marginHorizontal: 20,
  },
  form_card: {
    margin: 10,
    borderRadius: 25,
    backgroundColor: "#fefae0",
  },
  bottom_screen_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingTop: 40,
    paddingBottom: 20,
  },
  button_upload: {
    width: "80%",
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
  paymentMethods:{
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    // borderTopColor: 'grey',
    // borderTopWidth: 1,
    width: '100%'
  }
})

export default Checkout_Order_Screen
