import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default function Home({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onChangeEmail(text) {
    setEmail(text)
  }
  function onChangePassword(text) {
    setPassword(text)
  }

  return (
    <View style={styles.container}>
      <View style={styles.div2}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.register}>Register here now</Text>
      </View>
      <View>
        <View style={styles.div}>
          <Text style={styles.name}>Username:</Text>
          <TextInput
            style={{ 
              height: 40,
              width: 275,
              borderWidth: 3,
              borderColor: "black",
              borderRadius: 4,
              paddingHorizontal: 11,
              fontSize: 20,
              backgroundColor: 'whitesmoke',
              color: "#4B250F"
            }}
            onChangeText={text => onChangeEmail(text)}
          />
          <Text style={styles.name}>Email:</Text>
          <TextInput
            style={{ 
              height: 40, 
              width: 275,
              borderWidth: 3,
              borderColor: "black",
              borderRadius: 4,
              paddingHorizontal: 11,
              fontSize: 20,
              backgroundColor: 'whitesmoke',
              color: "#4B250F"
            }}
            onChangeText={text => onChangeEmail(text)}
          />
          <Text style={styles.name}>Password:</Text>
          <TextInput
            style={{ 
              height: 40, 
              width: 275,
              borderWidth: 3,
              borderColor: "black",
              borderRadius: 4,
              paddingHorizontal: 11,
              fontSize: 20,
              backgroundColor: 'whitesmoke',
              color: "#4B250F"
            }}
            onChangeText={text => onChangePassword(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          <View style={{margin:20, width: 200}}>
            <Button 
              title="Register"
              onPress={() => {
                if (email && password) {

                  // navigation.navigate('Game')
                } else if (email === "" || !email || password === "" || !email) {
                  alert('You must insert your email & password')
                }
              }}
              style={{  }}
              color="blue"
              // style={styles.button}
            />
          </View>
          <View style={{width: 200}}>
            <Button 
              title="I have an account"
              onPress={() => {
                navigation.navigate('Login')
              }}
              color="crimson"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  div2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  div2: {
    marginTop: 170,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  register: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
  },
  difficulty: {
    fontSize: 30,
  },
  option: {
    fontSize: 23,
    margin: 3
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
