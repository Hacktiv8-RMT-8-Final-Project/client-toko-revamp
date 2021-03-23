import React, { useState, useEffect } from "react"
import axios from "../../config/axios"
import { AsyncStorage, StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"
import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

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
  }, [access_token])

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* <Text>{JSON.stringify(completedOrder)}</Text> */}

          {completedOrder === undefined ? (
            <Card>
              <Card.Content>
                <Title>Your transaction history is empty</Title>
                <Paragraph>Start printing!</Paragraph>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
          ) : (
            // <Text>{JSON.stringify(completedOrder)}</Text>

            completedOrder.map((e) => {
              return (
                <Card style={styles.card} key={e.id}>
                  <Card.Content>
                    <View>
                      <Title style={styles.uuid}>Order Number: </Title>
                      <Paragraph>{e.order_number}</Paragraph>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        <Paragraph>Store</Paragraph>
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("http://google.com")}>
                          File PDF
                        </Text>
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("http://google.com")}>
                          Receipt transaction
                        </Text>
                      </View>
                      <View style={styles.rightContent}>
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
                        <Paragraph>{e.proof_receipt_transaction}</Paragraph>
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
  card: {
    marginTop: 10,
  },
  text: {
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    width: 150,
  },
  rightContent: {
    width: 140,
  },
  uuid: {
    fontSize: 18,
  },
})
export default Transaction_History_Screen
