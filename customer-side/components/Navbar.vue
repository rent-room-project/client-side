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
            <NuxtLink to="/about" exact-active-class="text-teal-400"
              >About</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div>
        <a
          href="#"
          class="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-700"
        >
          Sign In
        </a>
      </div>
    </div>
  </nav>
</template>
