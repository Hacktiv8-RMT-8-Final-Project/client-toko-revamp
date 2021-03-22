import React, {useState} from "react"
import { AsyncStorage } from 'react-native';
import axios from '../config/axios'
import { TouchableOpacity, Text, TextInput, View, StyleSheet, ImageBackground } from "react-native"

// import bgImage from "../images/background_login_register.jpg"
// <ImageBackground source={bgImage} style={styles.backgroundContainer}>

function Login_Screen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onChangeEmail(text) {
    console.log(text);
    setEmail(text)
  }
  function onChangePassword(text) {
    console.log(text);
    setPassword(text)
  }

  const go_to_register_screen = () => {
    props.navigation.navigate("Register")
  }
  const go_to_dashboard_screen =  () => {
    axios({
      method: 'POST',
      url: `/user/login`,
      data: { email, password }
    }).then(({data}) => {
      // console.log(data.access_token);
      AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
      props.navigation.navigate("Dashboard")
    }).catch(err => {
      alert(err)
      console.log(err);
    })

  }
  
  // AsyncStorage.clear()
  AsyncStorage.getItem('access_token', (err, result) => {
    // console.log(result, 'ini dari asyncstorage diluar');
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Share Printer</Text>

        <View style={styles.inputView}>
          <TextInput onChangeText={onChangeEmail} style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c" />
        </View>
        <View style={styles.inputView}>
          <TextInput secureTextEntry={true} onChangeText={onChangePassword} style={styles.inputText} placeholder="Password" placeholderTextColor="#003f5c" />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={go_to_dashboard_screen}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={go_to_register_screen}>
          <Text style={styles.loginText}>REGISTER</Text>
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
    marginBottom: 20,
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
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#fb0b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

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

    backgroundColor: "black",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Login_Screen
