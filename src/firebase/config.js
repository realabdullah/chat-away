 import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

/* code from Firebase console */
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  databaseURL: process.env.VUE_APP_URL,
  projectId: "chataway-a21aa",
  storageBucket: "chataway-a21aa.appspot.com",
  messagingSenderId: process.env.VUE_APP_ID,
  appId: process.env.VUE_APP_APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }