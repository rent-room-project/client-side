<script setup lang="ts">
const props = defineProps(["imgUrl"]);
</script>

<template>
  <Card>
    <img class="w-full" :src="props.imgUrl" />
    <div class="p-4 relative flex flex-col gap-2">
      <a
        href=""
        class="bg-sky-600 w-12 h-12 rounded-full flex justify-center items-center text-white absolute -top-6 right-5 drop-shadow-md"
      >
        <IconsCursorFill width="23" heigth="23" />
      </a>
      <div class="flex flex-col">
        <h5 class="text-2xl font-semibold text-gray-800">Price</h5>
        <p class="text-xl text-gray-500">Title</p>
      </div>
      <p>Location</p>
      <div class="flex justify-between">
        <p>Type</p>
        <p>Facility</p>
      </div>
    </div>
  </Card>
</template>
