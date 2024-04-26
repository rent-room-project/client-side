<script setup lang="ts">
const isLogin = useIsLogin();

function login() {
  isLogin.value = !isLogin.value;
  console.log(isLogin.value);
}
</script>

<template>
  <section class="about">
    <h1 class="text-4xl font-bold">About page</h1>
    <button
      @click="login"
      class="bg-sky-500 p-1 text-white rounded hover:bg-sky-700"
    >
      Login
    </button>
  </section>
</template>
