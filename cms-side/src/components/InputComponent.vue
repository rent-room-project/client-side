<script setup lang="ts">
const props = defineProps({
  type: String,
  name: String,
  placeHolder: String,
  isInvalid: Boolean
});

const model = defineModel();
</script>

<template>
  <input
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeHolder"
    v-model="model"
    :class="{ 'is-invalid': props.isInvalid }"
  />
</template>

<style scoped>
input {
  border: none;
  padding: 20px;
  background-color: #f8fae5;
  border-radius: 5px;
  outline: none;
}

input:focus {
  background-color: lightblue;
  border: 1px solid #90d26d;
}
</style>
