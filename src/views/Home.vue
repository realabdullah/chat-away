<template>
  <div class="homepage">
    <h1>chatAway</h1>
    <nav>
      <span v-if="isLoggedIn"> 
        <div class="register">
          <router-link to="/chat"> Chat Room </router-link>
        </div>
        <div class="signin" @click="signOut">
          Logout
        </div>
      </span>
      <span v-else>
        <div class="register">
          <router-link to="/register"> Sign Up </router-link>
        </div>
        <div class="signin">
          <router-link to="/sign-in"> Login </router-link>
        </div>
      </span>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase'

export default {
  setup() {
    const isLoggedIn = ref(true)

     // runs after firebase is initialized
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
      }
    })

    return {
      isLoggedIn
    }
  }
}
</script>

<style>
.homepage {
  width: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(127deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);
}
.homepage h1 {
  /*font-size: 4rem;
  margin-right: 50px;*/
  margin-right: 50px;
  text-transform: uppercase;
  font-family: verdana;
  font-size: 2em;
  font-weight: 700;
  color: #3e64ff;
  text-shadow: 1px 1px 1px #5edfff, 1px 2px 1px #5edfff, 1px 3px 1px #5edfff, 1px 4px 1px #5edfff, 1px 5px 1px #5edfff, 1px 6px 1px #5edfff, 1px 7px 1px #5edfff, 1px 8px 1px #5edfff, 1px 9px 1px #5edfff, 1px 10px 1px #5edfff, 1px 18px 6px rgb(16 16 16 / 40%), 1px 22px 10px rgb(16 16 16 / 20%), 1px 25px 35px rgb(16 16 16 / 20%), 1px 30px 60px rgb(16 16 16 / 40%);
}
a {
  text-decoration: none;
  color: #fff;
}
.register {
  margin-bottom: 10px;
  padding: 20px;
  background-color: #3E64FF;
  border-radius: 7px;
  text-align: left;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.register:hover {
  cursor: pointer;
}
.signin {
  margin-top: 15px;
  padding: 20px;
  background-color: #5EDFFF;
  color: #fff;
  border-radius: 7px;
  text-align: right;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.signin:hover {
  cursor: pointer;
}
@media(max-width: 890px) {
  .homepage {
    flex-direction: column;
  }
  .homepage h1 {
    margin-bottom: 30px;
    margin-right: 0;
  }
}
</style>