<script setup lang="ts">
import { ref } from "vue"
import { useMessagesStore } from "../stores/MessageStore"
import { EnvVariables } from "../stores/EnvVariables"
import { useLogStore } from "../stores/LogStore"

const mStore = useMessagesStore()

const elevID = EnvVariables().signedInId
const elevsLärarId = useLogStore().getTeacherById(elevID)
const logObjectives = [
  "Vad har du gjort under dagen?",
  "Vad har du lärt dig?",
  "Vad förstod du inte / Vilka frågor har du inte fått svar på?",
  "Vad vill du lära dig mer om?",
]

const currentLog = ref(
  mStore
    .getMessages(mStore.weekDay, mStore.weekNumber, [elevID, elevsLärarId])
    .filter((log) => {
      if (log?.type === "log") {
        return log?.type === "log"
      }
    })[0]
)

const done = ref(currentLog.value?.content.split("\n")[0])
const learned = ref(currentLog.value?.content.split("\n")[1])
const missed = ref(currentLog.value?.content.split("\n")[2])
const want = ref(currentLog.value?.content.split("\n")[3])

// Just nu kollar den alla messages men vi vill ha logs så det behöver ändras
const title = ref(
  !mStore
    .getMessages(mStore.weekDay, mStore.weekNumber, [elevID, elevsLärarId])
    .filter((m) => {
      if (m.type === "log" && m.sender_id === elevID) {
        return m
      }
    }).length
    ? "Skriv ditt logboksinlägg!"
    : "Ändra ditt inlägg"
)

const onSubmit = () => {
  console.log(elevID, mStore.weekNumber)

  let message =
    done.value + "\n" + learned.value + "\n" + missed.value + "\n" + want.value

  message = message.replaceAll("undefined", "")
  if (
    mStore
      .getMessages(mStore.weekDay, mStore.weekNumber, [elevID, elevsLärarId])
      .filter((log) => {
        if (log.type === "log" && log.sender_id === elevID) {
          return log
        }
      }).length
  ) {
    mStore.uppdateLog({
      sender_id: elevID,
      recipient_ids: [elevID, 0],
      read: false,
      type: "log",
      content: message,
      weekNumber: mStore.weekNumber,
      weekDay: mStore.weekDay,
      time: new Date(),
    })
    console.log("updating message")
  } else {
    mStore.addMessage(elevID, [elevID, 0], message, "log")
    console.log("adding message")
  }

  title.value = "Ändra ditt inlägg"
}
</script>

<template>
  <h4>
    {{ title }}
  </h4>

  <q-form @submit="onSubmit">
    <q-input
      :label="logObjectives[0]"
      :rules="[(val) => val.length >= 1] || 'skriv vad du gjort idag'"
      v-model="done"
      autogrow
    />
    <q-input
      :label="logObjectives[1]"
      :rules="[(val) => val.length >= 1] || 'skriv vad du lärt dig idag'"
      v-model="learned"
      autogrow
    />
    <q-input
      :label="logObjectives[2]"
      :rules="[(val) => val.length >= 1] || 'skriv vad du inte förstod'"
      v-model="missed"
    />
    <q-input
      :label="logObjectives[3]"
      :rules="[(val) => val.length >= 1] || 'skriv ved du vill lära dig mer om'"
      v-model="want"
      autogrow
    />

    <br />
    <q-btn label="Submit" type="submit" color="primary" />
  </q-form>
</template>

<style scoped></style>
