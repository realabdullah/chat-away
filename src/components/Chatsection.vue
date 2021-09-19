<template>
  <section class="chat-box" ref="newmessage">
    <div v-for="doc in formattedDocuments" :key="doc.id" :class="(doc.name == user.displayName ? 'sender animate__animated animate__bounceInRight' : 'receiver animate__animated animate__bounceInLeft')">
      <div class="username">{{ doc.name }}</div>
      <div class="content">{{ doc.message }}</div>
      <div class="created">{{ doc.createdAt }} ago.</div>
    </div>
  </section>
</template>

<script>
import { onUpdated, ref, computed } from "vue"
import { formatDistanceToNow } from 'date-fns'
import getCollection from '../composables/getCollection'
import getUser from '../composables/getUser'

export default {
  setup() {
    const { documents, msgerror } = getCollection('messages')
    const { user } = getUser()

    // eslint-disable-next-line vue/return-in-computed-property
    const formattedDocuments = computed(() => {
      if(documents.value) {
        return documents.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return { ...doc, createdAt: time }
        })
      }
    })

     //auto scroll to last messages
    const newmessage = ref(null)

    onUpdated(() => {
      newmessage.value.scrollTop = newmessage.value.scrollHeight
    })

    return {
      formattedDocuments,
      newmessage,
      user
    }
  }
}
</script>

<style>

</style>