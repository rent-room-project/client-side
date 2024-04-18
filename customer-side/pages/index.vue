<template>
  <section class="root">
    <nav class="bg-white h-16">
      <div class="container mx-auto h-full flex items-center gap-6 px-4">
        <h2 class="text-xl">Inapin Ajah</h2>
        <ul class="flex gap-4 text-base">
          <li>
            <NuxtLink to="/" exact-active-class="text-teal-400">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" exact-active-class="text-teal-400"
              >About</NuxtLink
            >
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mx-auto px-4">
      <NuxtPage />
    </div>
  </section>
</template>
