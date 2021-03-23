import React, { useState, useEffect } from "react"
import axios from "../../config/axios"
import { Title, Chip, Card, Paragraph } from "react-native-paper"
import { AsyncStorage, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from "react-native"

import { Loading_Component, Error_Component } from "../../components"

let data_backend = {
  msg: "Successfully read shop details",
  data: {
    id: 1,
    name: "toko printer",
    products: [
      {
        "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
          display_name: "Jilid - A3",
          price: 5000,
          description: "some description",
        },
      },
      {
        "2f12710a-f518-48e4-beed-05f5fba81d7a": {
          display_name: "Print Warna A3 (Per Halaman)",
          price: 2000,
          description: "some description",
        },
      },
    ],
    location: "{id: 0, lat: -6.2041139879292135, lng: 106.8042508374194}",
    status_open: true,
    email: "printer@mail.com",
    password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
    createdAt: "2021-03-21T00:41:34.009Z",
    updatedAt: "2021-03-21T11:54:31.623Z",
  },
}

function Shop_Profile_Screen(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shopDetail, setShopDetail] = useState(props.route.params.shop)

  const fill_add_form = () => {
    props.navigation.navigate("Form Order Print", { shop: shopDetail })
  }
  const chatting_with_shop = () => {
    console.log(`chatting_with_shop`)
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.container_detail}>
          <View style={styles.header}>
            <Text style={styles.storeName}>{shopDetail.name}</Text>
            <Text style={{ fontWeight: "bold" }}>Welcome, to our shop!</Text>
            <View style={styles.info}>
              <Chip mode="outlined" style={{ backgroundColor: "#faedcd" }} icon="map-marker">
                Location
              </Chip>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <Text style={{ marginTop: 12 }}>Available Products:</Text>
            {shopDetail.status_open ? (
              <Chip style={{ backgroundColor: "#d4a373" }} icon="information">
                Open
              </Chip>
            ) : (
              <Chip style={{ backgroundColor: "#ccd5ae" }} icon="information">
                Closed
              </Chip>
            )}
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.products}>
              {shopDetail.products.map((e, index) => {
                let temp = Object.keys(e)[0]
                // let newData = Object.values(temp)
                return (
                  <View style={{ width: 330, marginBottom: 5 }} key={index}>
                    <Card style={styles.products_card}>
                      <Card.Content>
                        <Title>{e[temp].display_name}</Title>
                        <Paragraph style={{ marginBottom: 10 }}>{e[temp].description}</Paragraph>
                        <View style={styles.priceContainer}>
                          <Paragraph>Price : </Paragraph>
                          <Paragraph style={{ fontWeight: "bold", marginBottom: 10 }}>
                            Rp {e[temp].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00
                          </Paragraph>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={fill_add_form} style={styles.button}>
            <Text style={styles.button_text}>Print Request</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={chatting_with_shop} style={styles.button}>
          <Text style={styles.button_text}>Chat with shop</Text>
        </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#d4a373",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  container_detail: {
    flex: 4,
    paddingTop: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  product: {
    justifyContent: "center",
    alignItems: "center",
  },
  products_card: {
    backgroundColor: "#faedcd",
    borderRadius: 25,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    width: 530,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  storeName: {
    fontSize: 50,
    marginBottom: 5,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 550,
  },
  priceContainer: {
    flexDirection: "row",
  },
})

export default Shop_Profile_Screen
