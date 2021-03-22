
import React, { useState, useEffect } from "react"
import axios from '../../config/axios'
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"

import Constants from "expo-constants"
import { Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

function Current_Orders_Screen(props) {
  let data_backend = {
    msg: "Successfully read your orders that are not completed",
    data: [
      {
        id: 2,
        order_number: "03ea8590-8912-11eb-a47c-477e9a2cdd7b",
        order_content: {
          data: "requirement printing options"
        },
        files_url: "https://dummy.downloadlink.here",
        order_price: 10000,
        shop_Id: 1,
        email_user: "user@mail.com",
        payment_status: 1,
        proof_receipt_transaction: null,
        createdAt: "2021-03-20T00:20:03.306Z",
        updatedAt: "2021-03-20T00:20:03.306Z"
      }
    ]
  }
  const [loading, setLoading] = useState(false)
  const [currentOrders, setCurrentOrders] = useState({})
  // useEffect(() => {
  //   setLoading(true)
  //   axios({
  //     method: 'GET',
  //     url: `user/transaction_history`,
  //   }).then(({data}) => {
  //     setCurrentOrders(data)
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
export default Current_Orders_Screen
