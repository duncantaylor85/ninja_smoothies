import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCeEpn9FlDFKEp66UZnW102NzPmLIWmEoU",
  authDomain: "ninja-smoothies-1234.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-1234.firebaseio.com",
  projectId: "ninja-smoothies-1234",
  storageBucket: "ninja-smoothies-1234.appspot.com",
  messagingSenderId: "26352944139",
  appId: "1:26352944139:web:bcc78044b0e1d74930f30e",
  measurementId: "G-EYJ3D16DS9"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();

// firebase.analytics();
