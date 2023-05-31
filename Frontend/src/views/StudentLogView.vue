<template>
  <div>
    <WeekNavigationComponent @Update="updateValues"></WeekNavigationComponent>
    <div
      v-if="
        useMessagesStore().getMessages(day.weekDay, week.week, [
          EnvVariables().selectedUser,
          0,
        ])[0].content != ''
      "
    >
      <StudentLogQuestionComponent
        :q="'Vad har du gjort idag?'"
        :a="
          useMessagesStore().getMessages(day.weekDay, week.week, [
            EnvVariables().selectedUser,
            0,
          ])[0].content
        "
      >
      </StudentLogQuestionComponent>
    </div>
    <div v-else>
      <StudentLogQuestionComponent
        :q="'Vad har du gjort idag?'"
        :a="'User har not written a log'"
      >
      </StudentLogQuestionComponent>
    </div>

    <!-- ------------ -->

    <div
      v-if="
        useMessagesStore().getMessages(day.weekDay, week.week, [
          EnvVariables().selectedUser,
          EnvVariables().signedInId,
        ])[0].content != ''
      "
    >
      <ChatComponent
        :messages="
          useMessagesStore().getMessages(day.weekDay, week.week, [
            EnvVariables().selectedUser,
            EnvVariables().signedInId,
          ])
        "
      ></ChatComponent>
    </div>
    <div v-else></div>
    <ChatComment2Vue></ChatComment2Vue>
  </div>
</template>
<script setup lang="ts">
//import { useLogStore } from '../stores/LogStore'
import { useMessagesStore } from "../stores/MessageStore"
import { ref } from "vue"

//import { LoggedInUser } from '../stores/LoggedInUser'
import ChatComment2Vue from "../components/ChatComment2.vue"
import { useLogStore } from "../stores/LogStore"
import WeekNavigationComponent from "../components/WeekNavigationComponent.vue"
import StudentLogQuestionComponent from "../components/StudentLogQuestionComponent.vue"
import ChatComponent from "../components/ChatComponent.vue"
import { EnvVariables } from "../stores/EnvVariables"

console.log("igen", EnvVariables().selectedDay, EnvVariables().selectedUser)

interface IWeekDay {
  weekDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
}

const day = ref({ weekDay: EnvVariables().selectedDay } as IWeekDay)
const week = ref({ week: useMessagesStore().weekNumber })

function updateValues() {
  day.value = { weekDay: EnvVariables().selectedDay } as IWeekDay
  week.value = { week: EnvVariables().selectedWeek }

  // console.log(day.value.weekDay)
  // console.log(week.value.week)
}

//const currentUser = LoggedInUser().id
</script>
