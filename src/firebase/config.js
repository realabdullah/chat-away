import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

/* code from Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyCBxcgo-jEJeHGBV5Fu3nYBTrXMDDgYZ6w",
  authDomain: "chataway-a21aa.firebaseapp.com",
  databaseURL: "https://chataway-a21aa-default-rtdb.firebaseio.com",
  projectId: "chataway-a21aa",
  storageBucket: "chataway-a21aa.appspot.com",
  messagingSenderId: "366578878214",
  appId: "1:366578878214:web:c7ae84e8b3a1bb85d44087"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }