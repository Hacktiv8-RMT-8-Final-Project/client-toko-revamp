import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

import Ionicons from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Add_Order_Screen, Current_Orders_Screen, Transaction_History_Screen, Profile_Settings_Screen } from "./dashboards"

const Tab = createBottomTabNavigator()
function Dashboard_Screen(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Form_Add_Order") {
            iconName = focused ? "add-circle" : "add-circle-outline"
          } else if (route.name === "Current_Orders") {
            iconName = focused ? "document-text" : "document-text-outline"
          } else if (route.name === "Transaction_History") {
            iconName = focused ? "cube" : "cube-outline"
          } else if (route.name === "Profile_Settings") {
            iconName = focused ? "book" : "book-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Form_Add_Order" component={Add_Order_Screen} />
      <Tab.Screen name="Current_Orders" component={Current_Orders_Screen} />
      <Tab.Screen name="Transaction_History" component={Transaction_History_Screen} />
      <Tab.Screen name="Profile_Settings" component={Profile_Settings_Screen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    display: "flex",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
    margin: 5,
    borderWidth: 1,
    borderColor: "blue",

    backgroundColor: "white",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Dashboard_Screen
