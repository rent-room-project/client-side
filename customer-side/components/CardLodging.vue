<script setup lang="ts">
type CardLodgingProp = {
  lodging: Lodging;
  bookmarks?: Bookmark[];
};

type CardLodgingEmit = {
  (e: "bookmarkHandle", lodgingId: string): Promise<void>;
};

const { lodging, bookmarks } = defineProps<CardLodgingProp>();

const emit = defineEmits<CardLodgingEmit>();

const isLogin = useIsLogin();
</script>

<template>
  <Card class="relative">
    <img class="w-full" :src="lodging.imgUrl" />
    <button
      @click="$emit('bookmarkHandle', lodging.id)"
      v-show="isLogin"
      :class="[
        isBookmarked(bookmarks!, lodging.id) ? 'text-rose-500' : 'text-white',
      ]"
      class="absolute top-5 left-5 p-3 bg-black bg-opacity-25 hover:bg-opacity-50 rounded-full"
    >
      <IconsHeartFill
        v-if="isBookmarked(bookmarks!, lodging.id)"
        width="20"
        height="20"
      />
      <IconsHeart v-else width="20" height="20" />
    </button>
    <div class="p-4 relative flex flex-col gap-3">
      <NuxtLink
        :to="`/lodgings/${lodging.id}`"
        class="bg-indigo-500 hover:bg-indigo-700 w-12 h-12 rounded-full flex justify-center items-center text-white absolute -top-6 right-5 shadow-lg"
      >
        <IconsCursorFill width="23" heigth="23" />
      </NuxtLink>
      <div class="flex flex-col">
        <h5 class="text-2xl font-semibold text-gray-800">
          {{ formatPrice(lodging.price) }}
        </h5>
        <p class="text-xl text-gray-500">{{ lodging.name }}</p>
      </div>
      <div class="flex gap-4">
        <IconsGeoAlt width="24" height="24" class="text-rose-600" />
        <p>{{ lodging.location }}</p>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-4">
          <IconsBuilding width="24" height="24" class="text-rose-600" />
          <p>{{ lodging.Type.name }}</p>
        </div>
        <div class="flex gap-4">
          <IconsPeople width="24" height="24" class="text-rose-600" />
          <p>{{ lodging.roomCapacity }} persons</p>
        </div>
      </div>
    </div>
  </Card>
</template>
