<script setup lang="ts">
useSeoMeta({
  title: "Inapin Ajah",
});

const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

let scriptTag = document.createElement("script");
scriptTag.src = midtransScriptUrl;

const myMidtransClientKey = "SB-Mid-client-zXO1esl1z1qalhBA";
scriptTag.setAttribute("data-client-key", myMidtransClientKey);

document.body.appendChild(scriptTag);
</script>

<template>
  <main class="min-h-screen bg-slate-100">
    <NuxtPage />
  </main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
