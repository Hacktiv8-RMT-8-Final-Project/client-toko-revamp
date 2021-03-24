import React, { useState, useEffect } from "react"
import axios from "../../config/axios"
import { AsyncStorage, StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native"
import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"
import { useIsFocused } from "@react-navigation/native"

import Ionicons from "react-native-vector-icons/Ionicons"
import * as Linking from "expo-linking"

import { Loading_Component, Error_Component } from "../../components"

function Transaction_History_Screen(props) {
  let data_backend = {
    msg: "Successfully read all your transaction history",
    data: [
      {
        id: 1,
        order_number: "b6280fe0-8906-11eb-a39a-edde261025b8",
        order_content: {
          data: "requirement printing options",
        },
        files_url: "https://dummy.downloadlink.here",
        order_price: 10000,
        shop_Id: 1,
        email_user: "user@mail.com",
        payment_status: 5,
        proof_receipt_transaction: "https://dummy.link-transaction-proof.com",
        createdAt: "2021-03-19T22:59:08.382Z",
        updatedAt: "2021-03-19T23:15:41.410Z",
      },
    ],
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [completedOrder, setCompletedOrder] = useState([])
  const isFocused = useIsFocused()

  const [access_token, set_access_token] = useState("")
  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
  }, [])

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `/user/transaction_history`,
      headers: {
        access_token: access_token || "",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // const input = JSON.parse(JSON.stringify(response.data.data))
        setCompletedOrder(response.data.data)
      })
      .catch((err) => {
        console.log(err)
        // setError(err)
      })
      .finally((_) => setLoading(false))
  }, [access_token, props, isFocused])

  const click_info_order = (data_order) => {
    console.log(data_order)
    props.navigation.navigate("Order Detail", { data: data_order })
  }

  // props.navigation.navigate("Shop Profile", { shop: selectedShop })

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>TRANSACTION HISTORY</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {/* <Text>{JSON.stringify(completedOrder)}</Text> */}
          {completedOrder.length === 0 ? (
            <Card style={styles.card_order}>
              <Card.Content style={{ alignItems: "center", textAlign: "center" }}>
                <Text>Your transaction history is empty</Text>
              </Card.Content>
            </Card>
          ) : (
            // <Text>{JSON.stringify(completedOrder)}</Text>

            completedOrder.map((e) => {
              return (
                <Card style={styles.card_order} key={e.id}>
                  <Card.Content>
                    <View>
                      <Title style={styles.uuid}>Order Number: </Title>
                      <Paragraph>{e.order_number}</Paragraph>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        {/* // ! Store and Price */}
                        <Paragraph>
                          <Ionicons style={styles.icon} name={"home-outline"} /> : {e.Shop.name}
                        </Paragraph>
                        <Paragraph>
                          <Ionicons style={styles.icon} name={"card-outline"} /> : Rp {e.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ,00
                        </Paragraph>
                        <View style={styles.info_container}>
                          <TouchableOpacity onPress={() => click_info_order(e)} style={styles.button_info}>
                            <Text>
                              <Ionicons style={styles.icon} name={"list-circle-outline"} /> Info
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(`${e.files_url}`)
                            }}
                            style={styles.button_download}
                          >
                            <Text>
                              <Ionicons style={styles.icon} name={"cloud-download-outline"} /> PDF
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.rightContent}>
                        {e.payment_status === 1 ? (
                          <Chip style={{ backgroundColor: "#90E3FF" }} icon="information" type="outlined">
                            Order requested
                          </Chip>
                        ) : e.payment_status === 2 ? (
                          <Chip style={{ backgroundColor: "#9099FF" }} icon="information" type="outlined">
                            Paid
                          </Chip>
                        ) : e.payment_status === 3 ? (
                          <Chip style={{ backgroundColor: "#9FFF90" }} icon="information" type="outlined">
                            Confirm
                          </Chip>
                        ) : e.payment_status === 4 ? (
                          <Chip style={{ backgroundColor: "#90FFA6" }} icon="information" type="outlined">
                            On Progress
                          </Chip>
                        ) : e.payment_status === 5 ? (
                          <Chip style={{ backgroundColor: "#D4A373" }} icon="information" type="outlined">
                            Completed
                          </Chip>
                        ) : e.payment_status === 6 ? (
                          <Chip style={{ backgroundColor: "#E090FF" }} icon="information" type="outlined">
                            Canceled
                          </Chip>
                        ) : e.payment_status === 7 ? (
                          <Chip style={{ backgroundColor: "#FF9090" }} icon="information" type="outlined">
                            Rejected
                          </Chip>
                        ) : (
                          <Chip style={{ backgroundColor: "red" }} icon="information" type="outlined">
                            Error
                          </Chip>
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            Linking.openURL(`${e.proof_receipt_transaction}`)
                          }}
                          style={styles.button_transaction}
                        >
                          <Text>
                            <Ionicons style={styles.icon} name={"receipt-outline"} /> Receipt Link
                          </Text>
                        </TouchableOpacity>
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
  scrollView: {
    marginHorizontal: 20,
  },
  card_order: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: "#faedcd",
    borderRadius: 25,
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
    width: 140,
  },
  info_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  uuid: {
    fontSize: 18,
  },
  button_transaction: {
    fontSize: 12,
    padding: 3,
    paddingLeft: 7,
    width: 125,
    borderRadius: 200,
    backgroundColor: "#CCD5AE",
    margin: 3,
    borderColor: "#D9AD82",
    borderWidth: 1,
    marginTop: 5,
  },
  button_info: {
    fontSize: 12,
    padding: 3,
    width: 75,
    borderRadius: 200,
    backgroundColor: "#FEFAE0",
    margin: 3,
    borderColor: "#D9AD82",
    borderWidth: 1,
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
  icon: {
    fontSize: 17,
    marginBottom: 5,
  },
})
export default Transaction_History_Screen
