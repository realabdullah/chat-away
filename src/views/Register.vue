<template>
  <div class="register">
    <h1> Create Account </h1>
    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input type='text' placeholder="Username" v-model='userInfo.username' />
    </div>
    <div class="input-container">
      <i class="fa fa-envelope icon"></i>
      <input type='text' placeholder="Email" v-model='email' />
    </div>
    <div class="input-container">
      <i class="fa fa-key icon"></i>
      <input type='password' placeholder="Password" v-model='password' />
    </div>
    <div class="input-container">
      <i class="fa fa-people icon"></i>
      <input type="text" placeholder="Gender" v-model="userInfo.gender">
    </div>
    <div class="input-container">
      <i class="fa fa-phone icon"></i>
      <input type="telephone" placeholder="Phone Number" v-model="userInfo.phone">
    </div>
    <div class="input-container">
      <i class="fa fa-location icon"></i>
      <input type="text" placeholder="State" v-model="userInfo.state">
    </div>
    
    <button class="submit" @click="handleSubmit">
      <div>Create Account</div>
    </button>
    <div class="login-stead">
      <p>Already have an account? </p><router-link to="/sign-in"> Login here </router-link>
    </div>
    <div class="hr">
      <p> Sign Up Using</p>
      <img @click="signUp" src="../assets/search.svg" alt="search">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'

export default {
  setup(props, context) {
    const { error, signup } = useSignup()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value)
      context.emit('signup')
    }

    return {
      displayName,
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
* {
  margin: 0;
  padding: 0;
}
.register {
  width: auto;
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  overflow: hidden;
  padding: 0px 15px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(125deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);

  h1 {
    color: #3e64ff;
    font-size: 2.3rem;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .input-container {
    display: -ms-flexbox; /* IE10 */
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }

  .icon {
    padding: 10px;
    background: dodgerblue;
    color: white;
    min-width: 50px;
    text-align: center;
  }

  .input-field {
    width: 100%;
    padding: 20px;
    outline: none;
  }

  .input-field:focus {
    border: 2px solid dodgerblue;
  }

  input {
    padding: 10px;
    border: none;
    border-radius: 0px 17px 17px 0px;
  }

  /*input {
    width: 100%;
    width: -webkit-fill-available;
    width: -moz-fill-available;
    border: 1px solid #e072e0;
    border-radius: 7px;
    outline: none;
    background: transparent;
    margin: 0px 10px;
    padding: 10px;
    font-size: 1.1rem;
  }*/

  .submit {
    width: auto;
    border: none;
    border-radius: 7px;
    background-color: #3e64ff;
    color: #fff;
    font-size: 1.1rem;
    padding: 15px;
    margin-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .login-stead {
    margin-top: 20px;
    font-size: 10px;
    color: #3d3c3c;
    
    a {
      color: #3e64ff;
    }
  }

  .hr {
    margin-top: 34px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin-right: 10px;
      font-weight: 1.5rem;
      font-weight: bold;
      color: #3d3c3c;
    }

    img {
      width: 25px;
    }
  }
}
</style>