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
@font-face {
  font-family: "San Francisco";
  font-weight: 400;
  src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff");
}

* {
  margin: 0;
  padding: 0;
  font-family: "San Francisco", Fallback, sans-serif;
}

</style>