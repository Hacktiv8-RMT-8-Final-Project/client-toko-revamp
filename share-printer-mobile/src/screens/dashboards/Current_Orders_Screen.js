import React, { useState, useEffect } from "react"
import { AsyncStorage, StyleSheet, Text, SafeAreaView, ScrollView, View, Alert, Modal, Pressable } from "react-native"

import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable, Provider, Portal } from "react-native-paper"

import * as DocumentPicker from "expo-document-picker"
import * as Linking from "expo-linking"

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
          ]
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
    AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
  }, [props])

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `/user/status_orders`,
      headers: {
        access_token: access_token || "",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response)
        setCurrentOrders(response.data.data)
      })
      .catch((err) => {
        console.log(err)
        // setError(err)
      })
      .finally((_) => setLoading(false))
  }, [file_url_link, proof_transaction_link, props, isFocused])

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
  console.log(currentOrders, 'ini curr orders');
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* <Text>{JSON.stringify(currentOrders)}</Text> */}

          {currentOrders.length === 0 ? (
            <Card>
              <Card.Content>
                <Title>Your current orders are empty</Title>
                <Paragraph>Start printing!</Paragraph>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
          ) : (
            currentOrders.map((e) => {
              return (
                <Card style={styles.card} key={e.id}>
                  <Card.Content>
                    <View>
                      <Title style={styles.uuid}>Order Number: </Title>
                      <Paragraph>{e.order_number}</Paragraph>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        <Title>Summary</Title>
                        <View style={styles.current_order_container}>
                          <ScrollView style={styles.scrollView}>
                            <Text>{JSON.stringify(e.order_content)}</Text>
                          </ScrollView>
                        </View>
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL(`${e.links_url}`)}>
                          File PDF
                        </Text>
                        {e.proof_receipt_transaction !== null ? (
                          <Text style={{ color: "blue" }} onPress={() => Linking.openURL(`${e.proof_receipt_transaction}`)}>
                            Receipt transaction
                          </Text>
                        ) : (
                          <Text>Not paid yet</Text>
                        )}
                      </View>
                      <View style={styles.rightContent}>
                        <Button
                          style={styles.btnUpload}
                          icon="upload"
                          mode="outlined"
                          onPress={() => {
                            upload_your_pdf_file(e.id)
                          }}
                        >
                          Upload File
                        </Button>
                        <Button
                          style={styles.btnUpload}
                          icon="upload"
                          mode="outlined"
                          onPress={() => {
                            upload_proof_transaction(e.id)
                          }}
                        >
                          Receipt
                        </Button>
                        {e.payment_status === 1 ? (
                          <Chip icon="information" type="outlined">
                            Order requested
                          </Chip>
                        ) : e.payment_status === 2 ? (
                          <Chip icon="information" type="outlined">
                            Paid
                          </Chip>
                        ) : e.payment_status === 3 ? (
                          <Chip icon="information" type="outlined">
                            Confirm
                          </Chip>
                        ) : e.payment_status === 4 ? (
                          <Chip icon="information" type="outlined">
                            On Progress
                          </Chip>
                        ) : e.payment_status === 5 ? (
                          <Chip icon="information" type="outlined">
                            Completed
                          </Chip>
                        ) : (
                          <Chip icon="information" type="outlined">
                            Canceled
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
  current_order_container: {
    maxHeight: 50,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 14,
  },
  card: {
    marginTop: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    width: 150,
  },
  rightContent: {
    width: 150,
  },
  uuid: {
    fontSize: 18,
  },
  btnUpload: {
    marginVertical: 10,
  }
})
export default Current_Orders_Screen
