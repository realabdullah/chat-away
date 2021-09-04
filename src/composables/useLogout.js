import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projectAuth } from '../firebase/config'

const router = useRouter()
const logoutError = ref(null)

const logout = async () => {
  logoutError.value = null
  
  try {
    await projectAuth.signOut()
    router.push('/')
  } catch(err) {
    console.log(err.message)
    logoutError.value = err.message
  }
}

const useLogout = () => {
  return { logoutError, logout }
}

export default useLogout