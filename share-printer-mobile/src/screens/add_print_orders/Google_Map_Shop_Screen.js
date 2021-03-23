import React from "react"
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"

import MapView from "react-native-maps"

let data_backend = {
  msg: "Successfully read list of shop including the details near your area",
  data: [
    {
      id: 2,
      name: "MercuAna Printer",
      products: null,
      location: "{id: 0, lat: -6.21367608579002, lng: 106.73623643541197}",
      status_open: true,
      email: "mercuana_printer@mail.com",
      password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
      createdAt: "2021-03-21T00:41:34.009Z",
      updatedAt: "2021-03-21T00:41:34.009Z",
    },
    {
      id: 3,
      name: "Jaka Printer",
      products: null,
      location: "{id: 0, lat: -6.153595345453926, lng: 106.75958047566237}",
      status_open: true,
      email: "jaka_printer@mail.com",
      password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
      createdAt: "2021-03-21T00:41:34.009Z",
      updatedAt: "2021-03-21T00:41:34.009Z",
    },
    {
      id: 4,
      name: "Kubar Printer",
      products: null,
      location: "{id: 0, lat: -6.229305035258377, lng: 106.78892301623551}",
      status_open: true,
      email: "kubar_printer@mail.com",
      password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
      createdAt: "2021-03-21T00:41:34.009Z",
      updatedAt: "2021-03-21T00:41:34.009Z",
    },
    {
      id: 5,
      name: "UNJ Printer",
      products: null,
      location: "{id: 0, lat: -6.192702113107159, lng: 106.88018509811859}",
      status_open: true,
      email: "unj_printer@mail.com",
      password: "$2a$10$no8mKFggsEZBKAVm/8zbTeMbu8KYvSxDvM5K0s5OFiwsSurcAAjce",
      createdAt: "2021-03-21T00:41:34.009Z",
      updatedAt: "2021-03-21T00:41:34.009Z",
    },
    {
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
  ],
}

function Google_Map_Shop_Screen(props) {
  const confirm_choose_shop = () => {
    props.navigation.navigate("Shop Profile")
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_map}>
          <MapView style={styles.map} />
        </View>
        <View style={styles.container_shop}>
          <Text>Choose nearby printing shop</Text>
          <Text>or your personal favourite shop</Text>
          <TouchableOpacity onPress={confirm_choose_shop} style={styles.button}>
            <Text style={styles.button_text}>Confirm Shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_map: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container_shop: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    width: "80%",
    backgroundColor: "#A7FF72",
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
  },
})

export default Google_Map_Shop_Screen
