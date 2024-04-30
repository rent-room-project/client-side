<script setup lang="ts">
const route = useRoute();

const {
  params: { id },
} = route;

const { data: lodging, error } = await useFetch<Lodging>(`/api/lodgings/${id}`);
</script>

<template>
  <div class="mt-3 pb-5">
    <div class="flex gap-3">
      <img
        class="rounded-xl shadow-xl"
        :src="lodging!.imgUrl"
        :alt="lodging!.name"
        width="700"
      />

      <Card class="grow p-10 flex gap-2 flex-col justify-between">
        <div class="flex flex-col gap-5">
          <div>
            <h1 class="text-3xl font-bold">
              {{ lodging!.name }}
            </h1>
            <p class="text-xl text-slate-500 font-semibold">
              {{ lodging!.location }}
            </p>
          </div>

          <p class="text-lg text-slate-500">
            {{ lodging!.facility }}
          </p>

          <div class="flex flex-col divide-y">
            <div class="flex justify-between text-lg py-1">
              <p class="text-slate-500 font-semibold">Capacity</p>
              <p class="font-bold">
                {{ lodging!.roomCapacity }}
              </p>
            </div>
            <div class="flex justify-between text-lg py-1">
              <p class="text-slate-500 font-semibold">Type</p>
              <p class="font-bold">
                {{ lodging!.Type.name }}
              </p>
            </div>
            <div class="flex justify-between text-lg py-1">
              <p class="text-slate-500 font-semibold">Author</p>
              <p class="font-bold">
                {{ lodging!.Author.username }}
              </p>
            </div>
          </div>

          <h1 class="text-3xl font-bold">
            {{ formatPrice(lodging!.price) }}
          </h1>
        </div>
        <div class="flex flex-col gap-2">
          <button
            class="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700"
          >
            Buy Now!
          </button>
          <div class="flex gap-2 divide-x">
            <button class="grow">Save</button>
            <button class="grow">Share</button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
