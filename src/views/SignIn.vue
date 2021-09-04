<template>
  <div class="login">
    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="form-inner">
        <h1>Login</h1>
        <input type="text" v-model="email" placeholder="Please enter your Email">
        <input type="password" v-model="password" placeholder="Password">
        <p v-if="errMsg"> {{ errMsg }} </p>
        <button class="submit" type="submit">Log In</button>
        <div class="reg-stead">
          Don't have an account? <router-link to="/register"> Create account </router-link>
        </div>
        <button @click="signWithGoogle">Google</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'

export default {
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if(!error.value) {
        context.emit('login')
      }
    }

    return {
      email,
      password,
      handleSubmit,
      error
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.login {
  width: auto;
  height: 100Vh;
  padding: 0px 15px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(211deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);
  display: grid;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  overflow: hidden;
}

.form-inner {
  

  h1 {
    color: #3e64ff;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: left;
  }

  input {
    width: 100%;
    width: -webkit-fill-available;
    width: -moz-fill-available;
    border: 1px solid #e072e0;
    border-radius: 7px;
    outline: none;
    background: transparent;
    padding: 10px;
    font-size: 1.1rem;
  }

  p {
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 1.5rem;
    font-weight: bold;
    color: #ff0000;
  }

  .submit {
    width: auto;
    border: none;
    border-radius: 7px;
    background-color: #3e64ff;
    color: #fff;
    font-size: 1.1rem;
    margin-top: 10px;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .reg-stead {
    margin-top: 20px;
    font-size: 10px;
    color: #3d3c3c;
    
    a {
      color: #3e64ff;
    }
  }
}
</style>