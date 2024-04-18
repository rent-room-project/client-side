<script setup lang="ts">
const count = ref(1);

const { data, error } = await useFetch("http://localhost:5000/public/types");

console.log(data.value);
console.log(error.value);
</script>

<template>
  <section class="home">
    <h1 class="text-4xl font-bold">Home page</h1>
    <button
      class="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-700"
      @click="count++"
    >
      Counter: {{ count }}
    </button>
    <br />
  </section>
</template>
