<template>
  <form>
    <div class="form-structor">
      <div class="signup" :class="slideUp && dClass">
        <h2 class="form-title" @click="signupBtn" id="signup"><span>or</span>Sign up</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-holder">
            <input type="text" class="input" placeholder="Display name" v-model="displayName" />
            <input type="email" class="input" placeholder="Email Address" v-model="email" />
            <input type="password" class="input" placeholder="Password" v-model="password" />
          </div>
          <button class="submit-btn">Sign up</button>
        </form>
      </div>
      <div class="login" :class="slideUp ? 'slide-down' : 'slide-up'">
        <div class="center">
          <h2 class="form-title" @click="loginBtn" id="login"><span>or</span>Log in</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-holder">
              <input type="email" class="input" placeholder="Email" v-model="email" />
              <input type="password" class="input" placeholder="Password" v-model="password" />
            </div>
            <button class="submit-btn">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'
import useLogin from '../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, signup } = useSignup()
    const { loginError, login } = useLogin()
    const router = useRouter()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const slideUp = ref(false)
    const dClass = ref('slide-up')

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value)
      router.push('/chat')
    }

    const handleLogin = async () => {
      await login(email.value, password.value)
      router.push('/chat')
    }

    const loginBtn = () => {
      slideUp.value = true
      console.log('slided')
    }

    const signupBtn = () => {
      slideUp.value = false
      console.log('unslided')
    }

    return {
      displayName,
      email,
      password,
      handleSubmit,
      handleLogin,
      error,
      loginError,
      slideUp,
      loginBtn,
      dClass,
      signupBtn
    }
  }
}
</script>

<style>

</style>