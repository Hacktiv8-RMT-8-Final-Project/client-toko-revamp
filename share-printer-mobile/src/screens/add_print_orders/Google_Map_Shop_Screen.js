import React, { useState, useEffect } from "react"
import { Alert, Picker, TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"
import axios from "../../config/axios"

import MapView, { Marker } from "react-native-maps"

import { Loading_Component, Error_Component } from "../../components"

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [shopList, setShopList] = useState([])
  const [shop_map, set_shop_map] = useState([])

  const [currentPosition, setCurrentPosition] = useState({
    longitude: 106.7699829,
    latitude: -6.1837949,
    longitudeDelta: 0.6,
    latitudeDelta: 0.6,
  })
  const [selectedShop, setSelectedShop] = useState({})

  const [selectedValue, setSelectedValue] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        longitudeDelta: 0.6,
        latitudeDelta: 0.7,
      })
    })
    // let shops = [...data_backend.data] // Data ini Dari Server dummy

    let map = shopList.map((item) => {
      if (typeof item.location === "string") {
        let latitude = +item.location.split("lat: ").slice(1).join("").split(", ")[0]
        let longitude = +item.location.split("lng: ").slice(1).join("").split("}")[0]
        item.location = { latitude, longitude }
      }

      return item
    })

    set_shop_map(map)
  }, [shopList])

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `/user/shop_list`,
    })
      .then((response) => {
        // console.log(response.data.data)
        setShopList(response.data.data)
      })
      .catch((err) => {
        console.log(err)
        // setError(err)
      })
      .finally((_) => setLoading(false))
  }, [])

  const selectShop = (shop) => {
    console.log(`pressed`)
    // console.log(shop)
    setSelectedShop(shop)
  }

  const on_change_picker = (shop) => {
    console.log(`clicked`)
    setSelectedValue(shop)
  }

  const confirm_choose_shop = () => {
    if (!selectedValue) {
      Alert.alert(
        "Please choose shop",
        "Using drop down select or google map",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      )
    } else {
      console.log(selectedShop)
      console.log(selectedValue)
      props.navigation.navigate("Shop Profile", { shop: selectedShop })
    }
  }

  if (loading) return <Loading_Component />
  if (error) return <Error_Component />
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_map}>
          <MapView style={styles.map} initialRegion={currentPosition}>
            <Marker coordinate={currentPosition} image={require("../../images/person.png")} title="this is You" />
            {shop_map.map((shop) => {
              return (
                <Marker
                  key={shop.id}
                  coordinate={shop.location}
                  onPress={() => selectShop(shop)}
                  title={shop.name}
                  description={shop.status_open === true ? "This Shop is Open" : "This Shop is Closed"}
                  image={shop.status_open === true ? require("../../images/print_open.png") : require("../../images/printer_closed.png")}
                />
              )
            })}
          </MapView>
        </View>

        <View style={styles.container_shop}>
          {/* <Text>{JSON.stringify(shopList)}</Text> */}

          <View style={styles.picker_container}>
            <Picker selectedValue={selectedValue} style={styles.picker_select} onValueChange={(shop_list, index) => on_change_picker(shop_list)}>
              <Picker.Item label="Choose shop printing shop here" value={null} enabled={false} />
              {shopList.map((e, index) => {
                return <Picker.Item key={index} label={e.name} value={e} />
              })}
            </Picker>
          </View>

          <View style={styles.display_picker}>
            <Text>{selectedShop.name}</Text>
            {/* <Picker selectedValue={selectedValue} style={styles.picker_select} onValueChange={(shop_list, index) => on_change_picker(shop_list)}>
              <Picker.Item label="Choose shop printing shop here" value={null} enabled={false} />
              {shopList.map((e, index) => {
                let data_to_string = e.toString()
                return <Picker.Item key={index} label={e.name} value={e} selectedValue={data_to_string} />
              })}
            </Picker> */}
          </View>

          <Text>Choose nearby printing shop</Text>
          {/* <Text>or your personal favourite shop</Text> */}
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
  picker_container: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 30,
  },
  picker_select: {
    width: 250,
    height: 44,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  display_picker: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
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
