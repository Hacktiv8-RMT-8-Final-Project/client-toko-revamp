import React from "react"
import { AsyncStorage } from "react-native"
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native"
import { Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons"

function Profile_Settings_Screen(props) {
  const log_out_go_to_home = () => {
    // const access_token = AsyncStorage.getItem("access_token").then((data) => console.log(data))
    // console.log(access_token)
    AsyncStorage.removeItem("access_token")
    props.navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
        <Image style={styles.photo} source={require('../../images/user.jpg')} />
      <Text style={styles.name}>Theophilus Atticus</Text>
      <Text style={styles.email}><Ionicons style={styles.email} name={'mail-open-outline'} /> theophilusatticus@mail.com</Text>
      <Text style={styles.setting}><Ionicons style={styles.icon} name={'create-outline'} /> Edit Profile</Text>
      <Text style={styles.setting}><Ionicons style={styles.icon} name={'shield-checkmark-outline'} /> Privacy</Text>
      <Text style={styles.setting}><Ionicons style={styles.icon} name={'help-circle-outline'} /> Help</Text>
      <Text style={styles.setting}><Ionicons style={styles.icon} name={'information-circle-outline'} /> About</Text>
      <TouchableOpacity onPress={log_out_go_to_home} style={styles.button}>
        <Text style={styles.button_text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#D4A373",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  photo: {
    marginBottom: 17,
    width: 230,
    height: 230,
    borderRadius: 200,
    borderColor: 'white',
    borderWidth: 7
  },
  name: {
    marginBottom: 2,
    fontSize: 30
  },
  email: {
    marginBottom: 20,
    fontSize: 20
  },
  setting: {
    fontSize: 17,
    marginBottom: 7,
    borderWidth: 1,
    padding: 3,
    paddingLeft: 7,
    width: 165,
    borderRadius: 200,
  },
  icon: {
    fontSize: 17,
    marginBottom: 5,
  }
})

export default Profile_Settings_Screen
