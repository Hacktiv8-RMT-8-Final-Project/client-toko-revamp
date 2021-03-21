import React from "react"
import { TouchableOpacity, Text, TextInput, View, StyleSheet, ImageBackground } from "react-native"

function Register_Screen(props) {
  const go_to_login_screen = () => {
    props.navigation.navigate("Login")
  }
  const submit_register_account = () => {
    // props.navigation.navigate("Login")
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c" />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="Password" placeholderTextColor="#003f5c" />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={submit_register_account}>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={go_to_login_screen}>
          <Text style={styles.loginText}>ALREADY HAVE ACCOUNT</Text>
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

export default Register_Screen
