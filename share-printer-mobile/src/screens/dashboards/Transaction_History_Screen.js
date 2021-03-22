import React, { useState, useEffect } from "react"
import axios from '../../config/axios'
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"

import Constants from "expo-constants"
import { Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

function Transaction_History_Screen(props) {
  let data_backend = {
    msg: "Successfully read all your transaction history",
    data: [
      {
        id: 1,
        order_number: "b6280fe0-8906-11eb-a39a-edde261025b8",
        order_content: {
          data: "requirement printing options"
        },
        files_url: "https://dummy.downloadlink.here",
        order_price: 10000,
        shop_Id: 1,
        email_user: "user@mail.com",
        payment_status: 5,
        proof_receipt_transaction: "https://dummy.link-transaction-proof.com",
        createdAt: "2021-03-19T22:59:08.382Z",
        updatedAt: "2021-03-19T23:15:41.410Z"
      }
    ]
  }

  // useEffect(() => {
  //   setLoading(true)
  //   axios({
  //     method: 'GET',
  //     url: `/shop/detail`,
  //   }).then(({data}) => {
  //     setReceipt(data)
  //   }).catch(err => {
  //     alert(err)
  //     console.log(err);
  //   }).finally(_ => {
  //     setLoading(false)
  //   })
  // },[])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Card>
            <Card.Content>
              <Title>UUID</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
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
  text: {
    fontSize: 14,
  },
})
export default Transaction_History_Screen
