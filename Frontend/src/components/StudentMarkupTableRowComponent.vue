// StudentMarkupTableRowComponent.vue
<script lang="ts">
export default {
  props: {
    name: String,
    id: Number,
  },
}
</script>

<script setup lang="ts">
import router from "../router"
import { EnvVariables } from "../stores/EnvVariables"

function UpdateEnv(day: string, id: number) {
  EnvVariables().selectedDay = day
  EnvVariables().selectedUser = id
  console.log(EnvVariables().selectedDay, EnvVariables().selectedUser)
  router.push({ name: "slog" })
}
</script>

<template>
  <tr>
    <td class="text-left">{{ name }}</td>
    <td class="text-right">
      <q-btn round icon="done" @click="UpdateEnv('Monday', id!)"
        ><q-badge floating color="blue" rounded label="0"
      /></q-btn>
    </td>
    <td class="text-right">
      <q-btn round icon="done" @click="UpdateEnv('Tuesday', id!)"
        ><q-badge floating color="blue" rounded label="0"
      /></q-btn>
    </td>
    <td class="text-right">
      <q-btn round icon="done" @click="UpdateEnv('Wednesday', id!)"
        ><q-badge floating color="blue" rounded label="0"
      /></q-btn>
    </td>
    <td class="text-right">
      <q-btn round icon="done" @click="UpdateEnv('Thursday', id!)"
        ><q-badge floating color="blue" rounded label="0"
      /></q-btn>
    </td>
    <td class="text-right">
      <q-btn round icon="done" @click="UpdateEnv('Friday', id!)"
        ><q-badge floating color="blue" rounded label="0"
      /></q-btn>
    </td>
  </tr>
</template>
