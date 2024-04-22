<script setup lang="ts">
const route = useRoute();

const {
  params: { id },
} = route;
</script>

<template>
  <h1>{{ id }}</h1>
</template>
