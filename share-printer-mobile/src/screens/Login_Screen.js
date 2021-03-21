import React from "react"
import { ImageBackground, TouchableOpacity, Text, View, StyleSheet } from "react-native"

const image = {
  uri: "https://i.pinimg.com/originals/50/cc/c9/50ccc93762692467792b0930029117b5.jpg",
}

function Home_Screen(props) {
  const go_to_user_screen = () => {
    props.navigation.navigate("User")
  }

  const go_to_finish_screen = () => {
    props.navigation.navigate("Finish")
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.text_flex}>
          <TouchableOpacity onPress={go_to_finish_screen} style={styles.button}>
            <Text style={styles.button_text}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={go_to_user_screen} style={styles.button}>
            <Text style={styles.button_text}>Start</Text>
          </TouchableOpacity>
          <Text style={styles.text_title}>SUDOKU</Text>
          <Text style={styles.text_subtitle}>Welcome to sudoku from suGOku!</Text>
          <Text style={styles.text_footer}>Hacktiv8 - Christ</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text_flex: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  text_title: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },
  text_subtitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  text_footer: {
    color: "white",
    fontSize: 8,
    fontStyle: "italic",
    textAlign: "center",
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

    backgroundColor: "white",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Home_Screen
