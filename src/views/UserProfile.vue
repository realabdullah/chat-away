<template>
  <div class="user">

    <div class="user-profile-pic">
      <img v-if="info.userPhoto" :src="info.userPhoto" alt="user">
      <img src="../assets/user.jpg" alt="user-solid" v-else>
    </div>

    <div class="user-name">
      <span class="username">
        {{ info.username }}
      </span> <br>
      <span class="email">
        {{ info.email }}
      </span>
    </div>

    <div class="user-actions">
      <button class="edit-profile">
        <img src="../assets/edit.svg" alt="edit">
        <p>Edit Profile</p>
      </button>
      <button @click="Logout" class="log-out">
        <img src="../assets/logout.svg" alt="logout">
        <p>Log Out</p>
      </button>
    </div>

    <div class="personal-info">
      <p>Personal Info.</p>
      <ul>
        <li>
          <img src="../assets/name.svg" alt="name">
          <p>Name: <span>{{ info.username }}</span></p>
        </li>
        <li>
          <img src="../assets/masculine-user.svg" alt="masculine-user">
          <p>Gender: <span>{{ info.gender }}</span></p>
        </li>
        <li>
          <img src="../assets/call.svg" alt="call">
          <p>Phone: <span>08140909884</span></p>
        </li>
        <li>
          <img src="../assets/pin.svg" alt="pin">
          <p>State: <span>Lagos</span></p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import firebase from 'firebase'
import { getUser } from '../db'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userId = computed(() => route.params.id)

    const info = reactive({
      userPhoto: '',
      username: '',
      gender: '',
      state: '',
      phone: ''
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        info.userPhoto = user.photoURL
        info.username = user.displayName
        info.email = user.email
        console.log(user.displayName)
        console.log(info.userPhoto)
      }
    })

    const Logout = () => {
      firebase.auth().signOut()
      router.push('/')
    }

    onMounted(async () => {
      const user = await getUser(userId.value)
      info.gender = user.gender,
      info.phone = user.info,
      info.state = user.state
    })

    onBeforeUnmount(() => {

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          info.userPhoto = user.photoURL
          info.username = user.displayName
          info.email = user.email
          console.log(user.displayName)
          console.log(info.userPhoto)
        }
      })
    })

    return { 
      info,
      Logout
    }
  }
} 
</script>

<style scoped>
body {
  background-color: rgb(23, 122, 209);
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
.user-profile-pic{
  margin-top: 40px;
  margin-bottom: 10px;
  border-radius: 100px;
}
.user-profile-pic img {
  width: 130px;
  height: 130px;
  border-radius: 100px;
  box-shadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0,0,0,.12);
}
.user-name {
  margin-top: 15px;
  text-align: center;
}
.username {
  font-weight: bold;
  color: #3E64FF;
}
.user-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border: none;
  padding: 7px 14px;
  background-color: rgb(250, 250, 250);
  font-weight: bold;
  border-radius: 7px;
  box-shadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0,0,0,.12);
}
button img {
  width: 16px;
  margin-right: 5px;
}
button p {
  margin: 0;
  margin-left: 5px;
  color: #3E64FF;
}
.edit-profile {
  margin-right: 10px;
}
.log-out {
  margin-left: 10px;
}
.personal-info {
  margin-top: 40px;
  padding: 20px;
  background-color: aliceblue;
  border-radius: 7px;
  box-shadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0,0,0,.12);
}
.personal-info p {
  font-weight: bold;
}
ul {
  list-style: none;
}
li {
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
li img {
  width: 16px;
  margin-right: 8px;
}
li p {
  color: #3E64FF;
}
li p span {
  font-weight: normal;
  margin-left: 10px;
  color: #525253;
}
</style>