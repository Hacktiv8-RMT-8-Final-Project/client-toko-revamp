import React from "react"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import app from './src/firebaseConfig/base'

import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { Test_Screen, Login_Screen, Register_Screen, Dashboard_Screen } from "./src/screens"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
}
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
})

const Stack = createStackNavigator()
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              // cardStyleInterpolator: forFade,
            }}
          >
            {/* <Stack.Screen name="Test" component={Test_Screen} /> */}
            <Stack.Screen name="Login" component={Login_Screen} />
            <Stack.Screen name="Register" component={Register_Screen} />
            <Stack.Screen name="Dashboard" component={Dashboard_Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
