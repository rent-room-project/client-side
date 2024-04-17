<script setup lang="ts">
import { defineProps } from 'vue'

const { total, name } = defineProps(['total', 'name'])
</script>

<template>
  <div class="card">
    <h4 class="title">Total {{ name }}</h4>
    <h1 class="number">{{ total }}</h1>
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
  width: 200px;
}

.title {
  color: grey;
  margin-bottom: 10px;
}
</style>
