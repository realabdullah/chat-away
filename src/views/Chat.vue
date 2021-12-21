<template>
  <div class="chat-body">
    <header>
			<div class="user">
        <!--<img v-if="state.userPhoto" :src="state.userPhoto" alt="user"> -->
        <img src="../assets/user-solid.svg" alt="user">
        <h1>Welcome, <br> <span> {{ user.displayName }} </span> </h1>
      </div>
      <button @click="handleClick" class="logout">Logout</button>
    </header>

    <Chatsection />

    <footer>
      <form @submit.prevent="handleSubmit">
        <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3.00006V21.0001" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M3 12.0001L21 12.0001" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round"/>
        </svg> -->
        <input class="send-input" type="text" v-model="message">
        <button class="receive-input" type="submit">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.763 511.763" style="enable-background:new 0 0 511.763 511.763;" xml:space="preserve">
            <g>
              <g>
                <path d="M511.716,9.802c-0.107-0.853-0.213-1.707-0.533-2.56c-0.107-0.32-0.213-0.747-0.32-1.067
                  c-0.533-1.173-1.28-2.24-2.133-3.2c-0.96-0.853-2.027-1.6-3.2-2.133c-0.32-0.107-0.747-0.32-1.067-0.32
                  c-0.853-0.213-1.707-0.427-2.56-0.427c-0.427,0-0.747,0-1.173,0c-0.96,0-2.027,0.213-2.987,0.533
                  c-0.213,0.107-0.427,0.107-0.64,0.213h-0.107L6.436,213.962c-5.44,2.347-7.893,8.64-5.547,14.08c0.96,2.24,2.667,4.053,4.8,5.12
                  l178.347,94.4l94.507,178.347c1.813,3.52,5.44,5.653,9.387,5.76h0.427c4.053-0.107,7.68-2.667,9.387-6.4L510.969,14.815v-0.107
                  c0.107-0.213,0.107-0.427,0.213-0.64c0.32-0.96,0.533-1.92,0.533-2.987C511.716,10.655,511.822,10.228,511.716,9.802z
                  M35.342,224.522l418.88-182.08l-264.107,264L35.342,224.522z M287.182,476.362l-81.92-154.773l264-264.107L287.182,476.362z"/>
              </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
          </svg>
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
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
	font-family: 'SF Pro Display', sans-serif;
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
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #171717;
    border-bottom: 0.1rem solid #5e5b5b;

    .user {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        padding: 3px;
        width: 36px;
        height: 36px;
        border-radius: 100px;
        border: 3px solid #007AFF;
        margin-right: 10px;
      }

      h1 {
        font-size: 1.125rem;
        color: #fff;
        margin-bottom: 0rem;

        span {
          color: #898989;
          font-size: 0.9rem;
          padding-top: 3px;
        }
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
    background-image: url('../assets/chat-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    padding: 15px;
    height: 100%;
    margin-bottom: 50px;
    overflow: hidden;

    .receiver {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
			margin-bottom: 15px;

      .username {
        color: #898989;
        font-size: xx-small;
        font-weight: bold;
        margin-left: 3px;
        margin-bottom: 3px;
        max-width: 70%;
      }

      .content {
        padding: 10px 20px;
        word-wrap: break-word;
        background-color: #3C3C3E;
        border-radius: 25px;
        color: #fff;
        font-size: 0.9rem;
				line-height: 24px;
				max-width: 70%;
        position: relative;

        &:before, &:after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 25px;
        }

        &:before {
          left: -7px;
          width: 20px;
          background-color: #3C3C3E;
          border-bottom-right-radius: 16px 14px;
        }

        &:after {
          left: -26px;
          width: 26px;
          background: url('../assets/chat-bg.png');
          border-bottom-right-radius: 10px;
        }
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
      padding-right: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: hidden;

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
        padding: 10px 20px;
        word-wrap: break-word;
        background-color: #056162;
        border-radius: 25px;
        color: #fff;
        font-size: 0.9rem;
				line-height: 24px;
				max-width: 70%;
        position: relative;

        &:before, &:after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 25px;
        }

        &:before {
          right: -7px;
          width: 20px;
          background-color: #056162;
          border-bottom-left-radius: 16px 14px;
        }

        &:after {
          right: -26px;
          width: 26px;
          background: url('../assets/chat-bg.png');
          border-bottom-left-radius: 10px;
        }
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
      padding: 15px;
      background-color: #2C2C2E;

      .send-input {
        // flex: 1 1 100%;
        width: 100%;
        height: 30px;
        padding: 15px;
        border: none;
        outline: none;
        background-color: #4B4B4D;
        border-radius: 15px;
        color: #ffffff;
        font-size: smaller;
      }

      .receive-input {
        padding-inline: 10px;
        border: none;
        background-color: #312a2a;

        svg {
          width: 20px;
          height: 20px;
          fill: #007aff;
        }
      }
    }
  }
}

</style>
