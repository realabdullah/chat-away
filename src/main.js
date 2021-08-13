import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

/* code from our Firebase console */
var firebaseConfig = {
  apiKey: "AIzaSyCBxcgo-jEJeHGBV5Fu3nYBTrXMDDgYZ6w",
  authDomain: "chataway-a21aa.firebaseapp.com",
  projectId: "chataway-a21aa",
  storageBucket: "chataway-a21aa.appspot.com",
  messagingSenderId: "366578878214",
  appId: "1:366578878214:web:c7ae84e8b3a1bb85d44087"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)

app.mount('#app')