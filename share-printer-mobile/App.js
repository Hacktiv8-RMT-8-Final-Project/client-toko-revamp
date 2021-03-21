import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login'
import Register from './src/screens/Register'

const Stack = createStackNavigator();

import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

function Login_Screen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen!</Text>
    </View>
  )
}

function Register_Screen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register Screen!</Text>
    </View>
  )
}

function DashBoard_Screen() {
  return (
<<<<<<< HEAD
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dashboard Screen!</Text>
    </View>
  )
}

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
          <Stack.Screen name="DashBoard" component={DashBoard_Screen} />
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
=======
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
>>>>>>> bbb003fb1878c87b90d26d5b5c1495639cb0c960
