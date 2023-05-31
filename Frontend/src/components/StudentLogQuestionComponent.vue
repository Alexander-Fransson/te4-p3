<script lang="ts">
export default {
  props: {
    q: String,
    a: String,
  },
}
</script>

<template>
  <QCard bordered>
    <div class="questioncontainer">
      <h2>{{ q }}</h2>
      <p>{{ a }}</p>
    </div>
  </QCard>
</template>

<style scoped>
.questioncontainer * {
  color: black;
}
</style>
