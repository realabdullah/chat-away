<template>  
  <router-view />
</template>

<script>
import { ref, watchEffect } from 'vue' // used for conditional rendering
import { projectAuth } from './firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(true)

    // runs after firebase is initialized
    projectAuth.onAuthStateChanged(function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
      }
    })

    const signOut = () => {
      projectAuth.signOut()
      router.push('/')
    }

    return {
      isLoggedIn,
      signOut
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

</style>