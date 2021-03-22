import React, { useState, useEffect } from "react"
import axios from '../../config/axios'
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native"
import Constants from "expo-constants"
import { Chip, Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

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
                        <Button style={styles.btnUpload} icon="upload" mode="outlined" onPress={() => console.log('Pressed')}>
                          Upload File
                        </Button>
                        {
                          e.payment_status === 1 ? <Chip icon="information" type="outlined">Order requested</Chip> :
                          e.payment_status === 2 ? <Chip icon="information" type="outlined">Paid</Chip> :
                          e.payment_status === 3 ? <Chip icon="information" type="outlined">Confirm</Chip> :
                          e.payment_status === 4 ? <Chip icon="information" type="outlined">On Progress</Chip> :
                          e.payment_status === 5 ? <Chip icon="information" type="outlined">Completed</Chip> :
                          <Chip icon="information" type="outlined">Canceled</Chip>
                        }
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
  text: {
    fontSize: 14,
  },
  card: {
    marginTop: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContent: {
    width: 150
  },
  rightContent: {
    width: 150
  },
  uuid: {
    fontSize: 19
  },
  btnUpload: {
    marginVertical: 10 
  }
})
export default Current_Orders_Screen
