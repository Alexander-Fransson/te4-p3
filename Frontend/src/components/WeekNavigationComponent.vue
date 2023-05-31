<!--
	TODO: Flytta till Component mappen
	TODO: Ändra vecka med knappar
	TODO: Sätt till rätt datum dynamiskt (I messageStore finns datum och vecka)
 -->
<template>
  <div class="q-pa-md q-gutter-md">
    <q-card class="my-card" align="center">
      <q-card-actions align="center" class="text-blue">
        <!-- <q-btn flat @click="privWeek"
          ><q-icon name="arrow_back"></q-icon
        ></q-btn> -->
        <div class="text-h6">week {{ mStore.weekNumber }}</div>
        <!-- <q-btn flat @click="nextWeek"
          ><q-icon name="arrow_forward"></q-icon
        ></q-btn> -->
      </q-card-actions>

      <q-card-section class="text-blue">
        <div class="text-h6">{{ userName }}</div>
      </q-card-section>

      <q-card-actions align="center" class="text-pink">
        <!-- <q-btn flat @click="privWeekDay"
          ><q-icon name="arrow_back"></q-icon
        ></q-btn> -->
        <div class="text-h6">{{ mStore.weekDay }}</div>
        <!-- <q-btn flat @click="nextWeekDay"
          ><q-icon name="arrow_forward"></q-icon
        ></q-btn> -->
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useLogStore } from "../stores/LogStore"
import { useMessagesStore } from "../stores/MessageStore"
import { EnvVariables } from "../stores/EnvVariables"
import { useLogInStore } from "../stores/LogInStore"

const emit = defineEmits(["Update"])
function emitUpdate() {
  emit("Update")
}

let userName = useLogStore().getNameById(EnvVariables().selectedUser)[0]

const daytonum: { [key: string]: number } = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
}

const mStore = useMessagesStore()

const weekNow = [mStore.weekNumber]

EnvVariables().selectedWeek = weekNow[0]

let w = weekNow[0]
let d = daytonum[EnvVariables().selectedDay]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
let weekDay = ref(EnvVariables().selectedDay)
EnvVariables().changeSelectedDay(weekDay.value)
let week = ref(weekNow[0])

function nextWeekDay() {
  if (d <= 3) {
    d += 1
    weekDay.value = weekDays[d]

    EnvVariables().selectedDay = weekDay.value
    emitUpdate()
  }
}
function privWeekDay() {
  if (d >= 1) {
    d -= 1
    weekDay.value = weekDays[d]

    EnvVariables().selectedDay = weekDay.value
    emitUpdate()
  }
}
function nextWeek() {
  if (w <= 51) {
    w += 1
    week.value = w

    EnvVariables().selectedWeek = week.value
    emitUpdate()
  }
}
function privWeek() {
  if (w >= 2) {
    w -= 1
    week.value = w

    EnvVariables().selectedWeek = week.value
    emitUpdate()
  }
}
</script>

<style scoped></style>
