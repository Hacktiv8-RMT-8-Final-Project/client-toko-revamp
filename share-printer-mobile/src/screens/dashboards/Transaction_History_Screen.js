import React, { useState, useEffect } from "react"
import axios from 'axios'
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"
import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

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
  //     url: 'http://192.168.0.102:3000/shop/detail',
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
          {
            data_backend.data.map((e) => {
              return(
                <Card style={styles.card} key={e.id}>
                  <Card.Content>
                    <View>
                      <Title style={styles.uuid}>{e.order_number}</Title>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.leftContent}>
                        <Paragraph>{e.files_url}</Paragraph>
                        <Paragraph>Store</Paragraph>
                      </View>
                      <View style={styles.rightContent}>
                        {
                          e.payment_status === 1 ? <Chip icon="information" type="outlined">Order requested</Chip> :
                          e.payment_status === 2 ? <Chip icon="information" type="outlined">Paid</Chip> :
                          e.payment_status === 3 ? <Chip icon="information" type="outlined">Confirm</Chip> :
                          e.payment_status === 4 ? <Chip icon="information" type="outlined">On Progress</Chip> :
                          e.payment_status === 5 ? <Chip icon="information" type="outlined">Completed</Chip> :
                          <Chip icon="information" type="outlined">Canceled</Chip>
                        }
                        <Paragraph>{e.proof_receipt_transaction}</Paragraph>
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
          }
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
    marginTop: 10
  },
  text: {
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContent: {
    width: 150
  },
  rightContent: {
    width: 140
  },
  uuid: {
    fontSize: 19
  }
})
export default Transaction_History_Screen
