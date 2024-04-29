<script setup lang="ts">
type DataResponse = {
  UserId: string;
  Lodging: Lodging;
};

const { data, execute } = await useFetch<DataResponse[]>("/api/bookmarks", {
  headers: {
    access_token: localStorage.access_token,
  },
});

async function bookmarkHandle(lodgingId: string) {
  isBookmarked(data.value!, lodgingId)
    ? await deleteBookmark(lodgingId)
    : await addBookmark(lodgingId);
  await execute();
}
</script>

<template>
  <section class="about pb-5">
    <h1 class="text-4xl font-bold mb-8">Bookmark</h1>
    <hr />

    <div class="mt-2 flex flex-wrap gap-5">
      <div class="w-90" v-for="(bookmark, i) in data" :key="i">
        <CardLodging
          :lodging="bookmark.Lodging"
          :bookmarks="data!"
          @bookmark-handle="bookmarkHandle"
        />
      </div>
    </div>
  </section>
</template>
