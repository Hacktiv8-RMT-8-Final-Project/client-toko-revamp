import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDcCsYx3xXT5Z3GdRGgjtfgjUBZ-ocfpyk",
  authDomain: "share-printer-7dbd0.firebaseapp.com",
  projectId: "share-printer-7dbd0",
  storageBucket: "share-printer-7dbd0.appspot.com",
  messagingSenderId: "1084297895847",
  appId: "1:1084297895847:web:bdd15c7639e0f381b4e082"
};

let app

if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
}else {
  app =firebase.app(); // if already initialized, use that one
}
export default app