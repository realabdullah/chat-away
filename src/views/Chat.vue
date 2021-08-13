<template>
  <div class="chat-body">
    <header>
			<div class="user">
        <img v-if="state.userPhoto" :src="state.userPhoto" alt="user">
        <img v-else src="../assets/user-solid.svg" alt="user">
        <h1>Welcome, <br> {{ state.username }}</h1>
      </div>
      <button @click="Logout" class="logout">Logout</button>
    </header>

    <section class="chat-box">
			<div v-for="message in state.messages" :key="message.key" :class="(message.username == state.username ? 'sender animate__animated animate__bounceInRight' : 'receiver animate__animated animate__bounceInLeft')">
				<div class="username">{{ message.username }}</div>
				<div class="content">{{ message.content }}</div>
			</div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input class="send-input" type="text" v-model="inputMessage" placeholder="Type a message">
        <button class="receive-input" type="submit">
          <img src="../assets/send.svg" alt="paper-plane-regular">
        </button>
      </form>
    </footer>
  </div>
</template>

<script>
import {reactive, onMounted, onBeforeUnmount, ref} from "vue"
import firebase from 'firebase'
import { useRouter } from 'vue-router'
import { getAuth } from "firebase/auth";

export default {
  setup() {
    const inputUsername = ref("")
    const inputMessage = ref("")

    const state = reactive({
      username: '',
      userPhoto: '',
      messages: []
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        state.username = user.displayName
        state.userPhoto = user.photoURL
        console.log(user.displayName)
        console.log(state.userPhoto)
      }
    })

    const Login = () => {
      if(inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value
        inputUsername.value = ""
      }
    }

    const router = useRouter()

    const Logout = () => {
      firebase.auth().signOut()
      router.push('/')
    }

    const SendMessage = () => {
      const messagesRef = firebase.database().ref("messages")

      if(inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      
      const message = {
        username: state.username,
        content: inputMessage.value
      }

      messagesRef.push(message)
      inputMessage.value = ""
    }

    onMounted (() => {
      const messagesRef = firebase.database().ref("messages")

      messagesRef.on('value', snapshot => {
        const data = snapshot.val()
        let messages = []

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          })
        })
        state.messages = messages
      })
    })

    const authListener = firebase.auth().onAuthStateChanged(function(user) {
      if (!user) { // not logged in
        alert('you must be logged in to view this. redirecting to the home page')
        router.push('/')
      }
    })

    onBeforeUnmount(() => {
      // clear up listener
      authListener()

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          state.username = user.displayName
          state.userPhoto = user.photoURL
          console.log(user.displayName)
          console.log(state.userPhoto)
        }
      })
    })
    
    return {
      inputUsername,
      state,
      Login,
      SendMessage,
      inputMessage,
      Logout
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
	font-family: 'Poppins', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.chat-body {
  background: linear-gradient(283deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);

  header {
    display: flex;
    padding: 15px;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        padding: 3px;
        width: 50px;
        height: 50px;
        border-radius: 100px;
        border: 3px solid #5edfff;
        margin-right: 10px;
      }

      h1 {
        font-size: 0.8rem;
        color: #fff;
      }
    }

    button {
      padding: 7px;
      font-size: xx-small;
      height: max-content;
      border: none;
      border-radius: 5px;
      background-color: #3e64ff;
      color: #b2fcff;
      font-weight: bold;
    }
  }

  .chat-box {
    height: 100vh;
    background-image: url('../assets/wallpaper.png');
    border-radius: 20px 20px 0px 0px;
    padding: 15px;

    .receiver {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
			margin-bottom: 15px;

      .username {
        color: #6e6e70;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-bottom: 3px;
        max-width: 70%;
      }

      .content {
        padding: 2px 12px;
        background-color: #ecfcff;
        border-radius: 1px 20px 20px 20px;
        font-size: 0.9rem;
				line-height: 2rem;
				max-width: 70%;
      }
    }

    .sender {
      margin-top: 15px;
			margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .username {
        color: #6e6e70;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-bottom: 12px;
        max-width: 70%;
      }

      .content {
        padding: 2px 12px;
        background-color: #3e64ff;
        border-radius: 20px 1px 20px 20px;
        color: #fff;
        font-size: 0.9rem;
        line-height: 2rem;
        max-width: 70%;
      }
    }
  }

  footer {
    position: sticky;
    bottom: 0;

    form {
      display: flex;

      .send-input {
        flex: 1 1 100%;
        width: 100%;
        padding: 15px;
        border: none;
        outline: none;
        background-color: #f1f1f1;
        color: #6e6e70;
        font-size: smaller;
      }

      .receive-input {
        padding: 15px 15px 10px;;
        border: none;
        background-color: #3e64ff;

        img {
          width: 15px;
        }
      }
    }
  }
}

</style>
