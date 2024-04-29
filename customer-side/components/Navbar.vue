<script setup lang="ts">
const isLogin = useIsLogin();

function logout() {
  localStorage.removeItem("access_token");
  isLogin.value = false;
  notif("Success", "Sign Out Successfully", "success");
}
</script>

<template>
  <nav class="bg-white h-16">
    <div
      class="max-w-6xl mx-auto h-full flex items-center justify-between px-4"
    >
      <div class="flex items-baseline gap-6">
        <h2 class="text-xl">Inapin Ajah</h2>
        <ul class="flex gap-4 text-base">
          <li>
            <NuxtLink to="/" exact-active-class="text-teal-400">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink
              v-show="isLogin"
              to="/bookmark"
              exact-active-class="text-teal-400"
              >Bookmark</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div>
        <NuxtLink
          v-if="!isLogin"
          to="/login"
          class="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-700"
        >
          Sign In
        </NuxtLink>
        <button
          v-else
          @click="logout"
          class="bg-rose-600 text-white p-2 rounded-md hover:bg-rose-800"
        >
          Sign Out
        </button>
      </div>
    </div>
  </nav>
</template>
