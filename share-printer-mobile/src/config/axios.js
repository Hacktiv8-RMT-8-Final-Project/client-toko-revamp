import { AsyncStorage } from "react-native"
import axios from "axios"

// ? how to do this
// let access_token
// AsyncStorage.getItem("access_token").then((data) => (access_token = data))

const instance = axios.create({
  // ! Heroku
  // baseURL: `https://share-printer-finalproject.herokuapp.com/`,
  // ! local host
  baseURL: `http://192.168.100.13:3000`,
  // baseURL: 'http://localhost:3000'
  // headers: {
  //   access_token: access_token || "",
  //   "Content-Type": "application/json",
  // },
})

// ! change base url
// http://192.168.100.13:3000 - christ
// http://192.168.0.102:3000 - rofi
// http://192.168.43.132:3000 - mujib
// http://192.168.43.119:3000 - cakra
// https://share-printer-finalproject.herokuapp.com/ - heroku database

export default instance
