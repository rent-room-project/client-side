<script setup lang="ts">
const { data } = await useFetch("/api/lodgings");

const { data: e } = await useFetch("/api/lodgings/1");

console.log(e.value);
</script>

<template>
  <section class="home">
    <h1 class="text-4xl font-bold mb-8">Home page</h1>
    <hr />

    <div class="mt-2 flex flex-wrap gap-5">
      <div class="w-90" v-for="(lodging, i) in data?.lodgings" :key="i">
        <CardLodging :lodging="lodging" />
      </div>
    </div>
  </section>
</template>
