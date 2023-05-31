<!--
	TODO: Fixa ny användare, knappar ligger konstigt
	TODO: Knapparna gör något?
	TODO: Hämta lärare och elever dynamiskt
	TODO: Spara vald lärare i olika variabler
 -->
<template>
  <h4 v-if="userId === -1 || userRole == 'student'">
    Login as teacher to use this page
  </h4>
  <div v-else>
    <AdminTeacherComponent :teachers="teachers"></AdminTeacherComponent>
    <AdminStudentComponentVue
      :teachers="teachers"
      :students="students"
    ></AdminStudentComponentVue>
  </div>
</template>

<script setup lang="ts">
import AdminTeacherComponent from "../components/AdminTeacherComponent.vue"
import AdminStudentComponentVue from "../components/AdminStudentComponent.vue"
import { useLogStore } from "../stores/LogStore"
import { EnvVariables } from "../stores/EnvVariables"

const userId = EnvVariables().signedInId
const userRole = EnvVariables().singedInUserRole
const teachers = useLogStore().getTeachers()
const students = useLogStore().getStudents()
</script>

<style scoped></style>
