import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { Current_Order_Table, Order_Detail_Screen } from "../order_detail"

const Stack = createStackNavigator()
function Add_Order_Screen(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Current Order Table" component={Current_Order_Table} />
      <Stack.Screen name="Order Detail" component={Order_Detail_Screen} />
    </Stack.Navigator>
  )
}

export default Add_Order_Screen
