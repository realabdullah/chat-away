/*
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCBxcgo-jEJeHGBV5Fu3nYBTrXMDDgYZ6w",
  authDomain: "chataway-a21aa.firebaseapp.com",
  databaseURL: "https://chataway-a21aa-default-rtdb.firebaseio.com",
  projectId: "chataway-a21aa",
  storageBucket: "chataway-a21aa.appspot.com",
  messagingSenderId: "366578878214",
  appId: "1:366578878214:web:c7ae84e8b3a1bb85d44087"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = uid => {
  return usersCollection.add(uid)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export default firebaseApp */