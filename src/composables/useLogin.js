import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const loginError = ref(null)

const login = async (email, password) => {
  loginError.value = null

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    loginError.value = null
    console.log(res)
    return res
  } catch(err) {
    console.log(err.value)
    loginError.value = 'Incorrect login credentials'
  }
}

const useLogin = () => {
  return { loginError, login }
}

export default useLogin