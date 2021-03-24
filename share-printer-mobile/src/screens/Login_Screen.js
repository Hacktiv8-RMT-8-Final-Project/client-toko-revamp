import React, { useState } from "react"
import { AsyncStorage } from "react-native"
import axios from "../config/axios"
import logo from '../images/1.png'

import { TouchableOpacity, Text, TextInput, View, StyleSheet, ImageBackground, Image } from "react-native"

// import bgImage from "../images/background_login_register.jpg"
// <ImageBackground source={bgImage} style={styles.backgroundContainer}>

function Login_Screen(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onChangeEmail(text) {
    console.log(text)
    setEmail(text)
  }
  function onChangePassword(text) {
    console.log(text)
    setPassword(text)
  }

  const go_to_register_screen = () => {
    props.navigation.navigate("Register")
  }

  const go_to_dashboard_screen = () => {
    // props.navigation.navigate("Dashboard")

    axios({
      method: "POST",
      url: `/user/login`,
      data: { email, password },
    })
      .then(({ data }) => {
        const access_token = data.access_token
        AsyncStorage.setItem("access_token", access_token)
        props.navigation.navigate("Dashboard")
      })
      .catch((err) => {
        console.log(err)
        // setError(err)
      })
  }

  // AsyncStorage.clear()
  AsyncStorage.getItem("access_token", (err, result) => {
    // console.log(result, 'ini dari asyncstorage diluar');
  })

  return (
    <>
      <View style={styles.container}>
      <Image style={styles.logo} source={logo} />

        <View style={styles.inputView}>
          <TextInput onChangeText={onChangeEmail} style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c" />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry={true}
            onChangeText={onChangePassword}
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={go_to_dashboard_screen}>
          <Text style={styles.button_text_login}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={go_to_register_screen}>
          <Text style={styles.button_text_register}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 30,
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 35,
    marginBottom: 20,
  },
  loginText: {
    color: "black",
    fontSize: 15,
  },

  forgot: {
    color: "black",
    fontSize: 14,
    marginBottom: 10,
  },

  loginBtn: {
    width: "80%",
    backgroundColor: "#107C10",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#107C10',
    borderWidth: 1
  },
  button_text_login: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginVertical: 50

  },
  button_text_register: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#107C10",
    fontWeight: "bold",
  },
})

export default Login_Screen
