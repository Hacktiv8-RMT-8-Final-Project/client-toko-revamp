import React, { useState, useEffect } from "react"
import axios from "../../config/axios"
import { Title, Chip, Card, Paragraph } from "react-native-paper"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

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
  const [shopDetail, setShopDetail] = useState({})
  // useEffect(() => {
  //   setLoading(true)
  //   axios({
  //     method: 'GET',
  // url: `/shop/detail`,
  //   }).then(({data}) => {
  //     setShopDetail(data)
  //   }).catch(err => {
  //     alert(err)
  //     console.log(err);
  //   }).finally(_ => {
  //     setLoading(false)
  //   })
  // },[])
  console.log(shopDetail)
  const fill_add_form = () => {
    props.navigation.navigate("Form Order Print")
  }
  const chatting_with_shop = () => {
    console.log(`chatting_with_shop`)
  }
  if (loading) {
    return <ActivityIndicator size="large" />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.storeName}>{data_backend.data.name}</Text>
        <View style={styles.info}>
          <Text>Lokasi</Text>
          {data_backend.data.status_open ? <Chip icon="information">Open</Chip> : <Chip icon="information">Closed</Chip>}
        </View>
      </View>
      <View style={styles.products}>
        {data_backend.data.products.map((e, index) => {
          let temp = Object.keys(e)[0]
          // let newData = Object.values(temp)
          return (
            <View style={{ width: 330, marginBottom: 5 }} key={index}>
              <Card>
                <Card.Content>
                  <Title>{e[temp].display_name}</Title>
                  <Paragraph>{e[temp].price}</Paragraph>
                </Card.Content>
              </Card>
            </View>
          )
        })}
      </View>

      <View style={styles.buttonContainer}>
        <Text>Detail table product print Shop here!</Text>
        <TouchableOpacity onPress={fill_add_form} style={styles.button}>
          <Text style={styles.button_text}>Fill add Form</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={chatting_with_shop} style={styles.button}>
          <Text style={styles.button_text}>Chat with shop</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#cdcdcd",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    justifyContent: "center",
    alignItems: "center",
  },
  // products: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  info: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 530,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  storeName: {
    fontSize: 50,
    marginBottom: 5,
    fontWeight: "bold",
  },
})

export default Shop_Profile_Screen
