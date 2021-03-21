import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { Test_Screen, Login_Screen, Register_Screen, Dashboard_Screen } from "./src/screens"

const Stack = createStackNavigator()
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="Test" component={Test_Screen} /> */}
          <Stack.Screen name="Login" component={Login_Screen} />
          <Stack.Screen name="Register" component={Register_Screen} />
          <Stack.Screen name="Dashboard" component={Dashboard_Screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
