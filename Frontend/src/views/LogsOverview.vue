<template>
  <h4 v-if="userId === -1 || userRole == 'student'">
    Login as teacher to use this page
  </h4>
  <MarkupTableComponent v-else />
</template>

<script setup lang="ts">
import MarkupTableComponent from "../components/MarkupTableComponent.vue"
import { EnvVariables } from "../stores/EnvVariables"

const userId = EnvVariables().signedInId
const userRole = EnvVariables().singedInUserRole
</script>
