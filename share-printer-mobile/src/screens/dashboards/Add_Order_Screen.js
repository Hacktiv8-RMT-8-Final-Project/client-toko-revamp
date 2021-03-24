import React from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"

import { Landing_Page_Screen, Google_Map_Shop_Screen, Shop_Profile_Screen, Form_Order_Print_Screen, Order_Receipt_Screen, Payment_Methods_Screen } from "../add_print_orders"

const Stack = createStackNavigator()
function Add_Order_Screen(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing Page" component={Landing_Page_Screen} />
      <Stack.Screen name="Google Map Shop" component={Google_Map_Shop_Screen} />
      <Stack.Screen name="Shop Profile" component={Shop_Profile_Screen} />
      <Stack.Screen name="Form Order Print" component={Form_Order_Print_Screen} />
      <Stack.Screen name="Order Receipt" component={Order_Receipt_Screen} />
      <Stack.Screen name="Payment Methods" component={Payment_Methods_Screen} />
    </Stack.Navigator>
  )
}

export default Add_Order_Screen
