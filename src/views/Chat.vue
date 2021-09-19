<template>
  <div class="chat-body">
    <header>
			<div class="user">
        <!--<img v-if="state.userPhoto" :src="state.userPhoto" alt="user"> -->
        <img src="../assets/user-solid.svg" alt="user">
        <h1>Welcome, <br> {{ user.displayName }}</h1>
      </div>
      <button @click="handleClick" class="logout">Logout</button>
    </header>

    <Chatsection />

    <footer>
      <form @submit.prevent="handleSubmit">
        <input class="send-input" type="text" v-model="message" placeholder="Type a message">
        <button class="receive-input" type="submit">
          <img src="../assets/send.svg" alt="paper-plane-regular">
        </button>
      </form>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import useCollection from '../composables/useCollection'
import Chatsection from '../components/Chatsection.vue'

export default {
  components: {
    Chatsection
  },

  setup() {
    
    const router = useRouter()
    const { logout, logoutError } = useLogout()
    const { addDoc, error } = useCollection('messages')
    const { user } = getUser()

    const message = ref('')

    const handleSubmit = async() => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDoc(chat)
      if(!error.value) {
        message.value = ''
      }
    }

    const handleClick = async () => {
      router.push('/register')
      await logout()
      if(!logoutError.value) {
        console.log('User logged out')
      }
    }

    return {
      message,
      handleClick,
      handleSubmit,
      user
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
  height: 100%;
  /*background: linear-gradient(283deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);*/

  header {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #312a2a;

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
      background-color: #312a2a;
      color: #b2fcff;
      font-weight: bold;
      box-shadow:
        0px 3px 5px -1px rgba(0, 0, 0, 0.2),
        0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0,0,0,.12);
    }
  }

  .chat-box {
    background-image: url('../assets/wallpaper.png');
    padding: 15px;
    height: 100%;
    margin-bottom: 50px;

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

      .created {
        color: #6e6e70;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-top: 5px;
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
        display: none;
        color: #6e6e70;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-bottom: 12px;
        max-width: 70%;
      }

      .content {
        padding: 2px 12px;
        background-color: #312a2a;
        border-radius: 20px 20px 1px 20px;
        color: #fff;
        font-size: 0.9rem;
        line-height: 2rem;
        max-width: 70%;
      }

      .created {
        color: #6e6e70;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-top: 5px;
        max-width: 70%;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    width: -moz-available;
    width: -webkit-available;
    width: -webkit-fill-available;

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
        background-color: #312a2a;

        img {
          width: 15px;
        }
      }
    }
  }
}

</style>
