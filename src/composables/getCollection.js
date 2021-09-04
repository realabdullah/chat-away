import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
  const documents = ref(null)
  const msgerror = ref(null)

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  collectionRef.onSnapshot((snap) => {
    let results = []
    snap.docs.forEach(doc => {
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    msgerror.value = null
  }, (err) => {
    console.log(err.message)
    documents.value = null
    msgerror.value = 'Could not fetch data'
  })

  return {
    documents,
    msgerror
  }
}

export default getCollection