import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { History_Order_Table, Order_Detail_Screen } from "../order_detail"

const Stack = createStackNavigator()
function Transaction_History_Screen(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="History Order Table" component={History_Order_Table} />
      <Stack.Screen name="Order Detail" component={Order_Detail_Screen} />
    </Stack.Navigator>
  )
}

export default Transaction_History_Screen
