<!--
    FIXME: Visa lösenord Trasig halvt ja?
 -->
<script setup lang="ts">
import { useLogInStore } from "../stores/LogInStore"
import { ref } from "vue"
import { EnvVariables } from "../stores/EnvVariables"
import router from "../router"

const LogInStore = useLogInStore().users

const errorMessage = ["", "Kontot finns inte", "Fel lösenord"]
let error = ref(errorMessage[0])

function signInButton() {
  let i = 0
  while (i < LogInStore.length) {
    if (LogInStore[i].name === username.value) {
      if (LogInStore[i].password === password.value) {
        EnvVariables().signedIn = true
        EnvVariables().singedInUserRole = LogInStore[i].role
        EnvVariables().signedInId = LogInStore[i].id
        error.value = `Välkommen ${LogInStore[i].name}!`
        if (EnvVariables().singedInUserRole === "teacher") {
          router.push("/logs")
          break
        } else {
          router.push("/elev")
        }
        break
      } else {
        error.value = errorMessage[2]
        break
      }
    }
    error.value = errorMessage[1]
    i += 1
  }
}

const username = ref("")
const password = ref("")
const text = ref("")
let isPwd = false
</script>

<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        :height="250"
      />
    </q-card>
  </div>
  <div>
    <q-card class="login-card">
      <q-card-section>
        <h4 class="GG">{{ error }}</h4>
        <q-input v-model="username" label="Username">
          <template v-slot:before>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          @click="text = ''"
        >
          <template v-slot:before>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="">
          <br />
          <q-btn
            color="green"
            text-color="white"
            label="SIGN IN"
            @click="signInButton"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.GG {
  color: black;
}
</style>
