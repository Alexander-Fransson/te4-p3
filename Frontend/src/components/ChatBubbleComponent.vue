<template>
  <div v-if="sent">
    <q-chat-message :name="name" :text="message" sent />
  </div>
  <div v-else>
    <q-chat-message :name="name" :text="message" />
  </div>
</template>
<script lang="ts">
export default {
  props: {
    name: String,
    message: Array<string>,
    sent: Boolean,
  },
}
</script>

<style scoped>
/* v Det finns references i den färdig-genererade HTML:en */
* >>> .q-message-name {
  color: black;
}
</style>
