import React, { useState, useEffect } from "react"
import axios from "../../config/axios"
import { AsyncStorage, StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"
import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

import { Loading_Component, Error_Component } from "../../components"

function Current_Orders_Screen(props) {
  let data_backend = {
    msg: "Successfully read your orders that are not completed",
    data: [
      {
        id: 2,
        order_number: "03ea8590-8912-11eb-a47c-477e9a2cdd7b",
        order_content: {
          data: "requirement printing options",
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

  const [access_token, set_access_token] = useState("")
  useEffect(() => {
    AsyncStorage.getItem("access_token").then((data) => set_access_token(data))
  }, [])

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
  }, [access_token])

  const upload_file_button = (order_number) => {
    console.log(`upload file button`, order_number)
  }

  const recipe_transaction_button = (order_number) => {
    console.log(`upload file button`, order_number)
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

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
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("http://google.com")}>
                          File PDF
                        </Text>
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("http://google.com")}>
                          Receipt transaction
                        </Text>
                      </View>
                      <View style={styles.rightContent}>
                        <Button style={styles.btnUpload} icon="upload" mode="outlined" onPress={() => upload_file_button(e.order_number)}>
                          Upload File
                        </Button>
                        <Button style={styles.btnUpload} icon="upload" mode="outlined" onPress={() => recipe_transaction_button(e.order_number)}>
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
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
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
  },
})
export default Current_Orders_Screen
