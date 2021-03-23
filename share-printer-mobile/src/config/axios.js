import { AsyncStorage } from "react-native"
import axios from "axios"

// ? how to do this
// let access_token
// AsyncStorage.getItem("access_token").then((data) => (access_token = data))

const instance = axios.create({
  // baseURL: `http://192.168.100.13:3000`,
  baseURL: `http://192.168.43.132:3000`,
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


/* // ! example from website
  import axios from "axios";
  export default axios.create({
    timeout: 10000,
    baseURL: "http://localhost:3000",
    headers: {
      access_token: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json"
    }
  });
*/

export default instance
