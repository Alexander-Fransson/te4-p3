<template>
  <QCard>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <!-- <ChatBubbleComponent v-for="message in messages" :name="message[1]" :sent="true" :message="[message[0]]" ></ChatBubbleComponent> -->
        <ChatBubbleComponent
          v-for="i in messages"
          :name="useLogStore().getNameById(i.sender_id)[0]"
          :message="[i.content]"
          :sent="EnvVariables().signedInId == i.sender_id"
          v-bind:key="i.sender_id"
        ></ChatBubbleComponent>
      </div>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import { useLogStore } from "../stores/LogStore"
//import { useMessagesStore } from '../stores/MessageStore'
import { EnvVariables } from "../stores/EnvVariables"
import ChatBubbleComponent from "../components/ChatBubbleComponent.vue"
</script>

<script lang="ts">
//var testdata = [{name: 'Axel', message:'adasdsadsda'},{ name: 'Axelina', message: 'soifsiopsdfk'}]

interface IMessages {
  sender_id: number
  recipient_ids: number[]
  read: boolean
  type: "log" | "comment"
  content: string
  weekDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  weekNumber: number
  time: Date
}

export default {
  props: {
    messages: Array<IMessages>,
  },
  components: { ChatBubbleComponent },
}
</script>

<style scoped></style>
