import React from "react"

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

          if (route.name === "Dashboard") {
            iconName = focused ? "add-circle" : "add-circle-outline"
          } else if (route.name === "Current Orders") {
            iconName = focused ? "document-text" : "document-text-outline"
          } else if (route.name === "Transaction History") {
            iconName = focused ? "cube" : "cube-outline"
          } else if (route.name === "Profile Settings") {
            iconName = focused ? "book" : "book-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3e2913",
        inactiveTintColor: "#FEFAE0",
        activeBackgroundColor: "#FEFAE0",
        inactiveBackgroundColor: "#D9AD82",
      }}
    >
      <Tab.Screen name="Dashboard" component={Add_Order_Screen} />
      <Tab.Screen name="Current Orders" component={Current_Orders_Screen} />
      <Tab.Screen name="Transaction History" component={Transaction_History_Screen} />
      <Tab.Screen name="Profile Settings" component={Profile_Settings_Screen} />
    </Tab.Navigator>
  )
}

export default Dashboard_Screen
