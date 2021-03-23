import firebase from "firebase"

const config = {
  apiKey: "AIzaSyBfDS2lZUP3X7JOBCFw0sR_4zGFTEv9_TM",
  authDomain: "hacktiv8-share-printer.firebaseapp.com",
  projectId: "hacktiv8-share-printer",
  storageBucket: "hacktiv8-share-printer.appspot.com",
  messagingSenderId: "426163781003",
  appId: "1:426163781003:web:805c57f9569461d1f0838e",
  measurementId: "G-9SJC8BKXN0",
}

let app

if (!firebase.apps.length) {
  app = firebase.initializeApp(config)
} else {
  app = firebase.app() // if already initialized, use that one
}

export default app
