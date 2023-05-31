<script setup lang="ts">
import { ref } from "vue"
import { useMessagesStore } from "../stores/MessageStore"
import { EnvVariables } from "../stores/EnvVariables"
import { useLogStore } from "../stores/LogStore"

const mStore = useMessagesStore()

const message = ref("")

const elevID = EnvVariables().signedInId
const recipientID = EnvVariables().selectedUser

const onSubmit = () => {
  mStore.addMessage(elevID, [elevID, recipientID], message.value, "comment")
  //console.log(mStore.messages)

  message.value = ""
}
</script>

<template>
  <h6>Comment</h6>
  <q-form @submit="onSubmit">
    <q-input label="Write your comment" v-model="message" autogrow />
    <br />
    <q-btn label="Submit" type="submit" color="primary" />
  </q-form>
</template>

<style scoped></style>
