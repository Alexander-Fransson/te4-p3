<script setup lang="ts">
// import { useLogStore } from "./stores/LogStore"
// import { useMessagesStore } from "./stores/MessageStore"
import { EnvVariables } from "./stores/EnvVariables"
import router from "./router"

// const week = useMessagesStore().weekNumber
// const today = useMessagesStore().weekDay
// const testingToGetMessages = useMessagesStore().getMessages("Monday", 4, [1, 2])
// const testingToAddAMessage = useMessagesStore().addMessage(
//   15,
//   [10000000000],
//   "THIS IS THE NEW TEST",
//   "comment"
// )

//deprecatedFunction() /* Un comment me! */
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title
            ><q-btn :to="'/'" flat dense square label="Log-O-Matic"
          /></q-toolbar-title>
          <q-btn
            v-if="EnvVariables().singedInUserRole === 'teacher'"
            :to="{ name: 'admin' }"
            flat
            dense
            square
            icon="settings"
            label="Admin"
          />
          <q-btn
            v-if="EnvVariables().singedInUserRole === 'teacher'"
            :to="{ name: 'logs' }"
            flat
            dense
            square
            icon="format_list_bulleted"
            label="Logs"
          />
          <q-btn
            v-if="EnvVariables().signedIn === false"
            :to="{ name: 'login' }"
            flat
            dense
            square
            icon="login"
            label="Sign In"
          />
          <q-btn
            v-else
            flat
            dense
            square
            icon="logout"
            label="Sign Out"
            @click="
              ;(EnvVariables().signedIn = false),
                (EnvVariables().singedInUserRole = ''),
                (EnvVariables().signedInId = -1),
                router.push('/')
            "
          />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <h1>Vue-Log-O-Matic</h1>
          <router-view> </router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <div></div>
</template>

<style scoped></style>
