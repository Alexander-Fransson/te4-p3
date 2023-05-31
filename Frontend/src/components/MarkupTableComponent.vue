<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">Elever</th>
          <th class="text-right">Monday</th>
          <th class="text-right">Tuesday</th>
          <th class="text-right">Wednesday</th>
          <th class="text-right">Thursday</th>
          <th class="text-right">Friday</th>
        </tr>
      </thead>
      <tbody>
        <StudentMarkupTableRowComponent
          v-for="student in testdata"
          :name="student.name"
          :id="student.id"
          v-bind:key="student.name"
        ></StudentMarkupTableRowComponent>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { useLogStore } from "../stores/LogStore"
import StudentMarkupTableRowComponent from "../components/StudentMarkupTableRowComponent.vue"
import { EnvVariables } from "../stores/EnvVariables"

var testdata = useLogStore().getStudentsByTeacher(
  useLogStore().getNameById(EnvVariables().signedInId)[0]
) //[{ name: "Axel" }, { name: "Axelina" }]
</script>
