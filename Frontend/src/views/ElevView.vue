<!--
    TODO: Lägg till loggbokstexten och frågor
 -->
<template>
  <h4 v-if="userId === -1 || userRole === 'teacher'">
    Login as student to use this page
  </h4>
  <div v-else>
    <WeekNavigationComponent />
    <LogbokComponent :key="messageRef.messages.value.length + 1" />
    <ChatComponent
      :messages="comments()"
      :key="messageRef.messages.value.length"
    />
    <CommentFormComponent />
  </div>
</template>

<script setup lang="ts">
import WeekNavigationComponent from "../components/WeekNavigationComponent.vue"
import LogbokComponent from "../components/LogbokComponent.vue"
import CommentFormComponent from "../components/CommentFormComponent.vue"
import ChatComponent from "../components/ChatComponent.vue"
import { useMessagesStore } from "../stores/MessageStore"
import { EnvVariables } from "../stores/EnvVariables"
import { useLogStore } from "../stores/LogStore"
import { storeToRefs } from "pinia"

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

const mStore = useMessagesStore()
const userId = EnvVariables().signedInId
const userRole = EnvVariables().singedInUserRole
const messageRef = storeToRefs(mStore)

const comments = () => {
  return mStore
    .getMessages(mStore.weekDay, mStore.weekNumber, [
      useLogStore().getTeacherById(userId),
      userId,
    ])
    .filter((log) => log.type === "comment") as IMessages[]
}
</script>

<style scoped></style>
