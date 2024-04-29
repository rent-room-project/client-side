<script setup lang="ts">
import type { AxiosError } from "axios";

type DataResponse = {
  lodgings: Lodging[];
  totalData: number;
  totalPage: number;
};

const isLogin = useIsLogin();

const currentPage = ref(1);
const typeId = ref("");
const search = ref("");

const { data, error, pending } = await useFetch<DataResponse, AxiosError>(
  "/api/lodgings",
  {
    query: { page: currentPage, perPage: 9, typeId, search },
    lazy: false,
  }
);

const { data: types } = await useFetch<Type[]>("/api/types");
const bookmarks: Ref<Bookmark[]> = ref([]);

let refreshBookmark: (opts?: any) => Promise<void>;

if (isLogin.value) {
  ({
    data: { value: bookmarks.value },
    refresh: refreshBookmark,
  } = await useFetch("/api/bookmarks", {
    headers: {
      access_token: localStorage.access_token,
    },
  }));
}

function debounceSearch(e: Event) {
  setTimeout(() => {
    search.value = (e.target! as { [s: string]: any }).value;
  }, 1000);
}

function setPage(page: number) {
  currentPage.value = page;
}

async function bookmarkHandle(lodgingId: string) {
  isBookmarked(bookmarks.value!, lodgingId)
    ? await deleteBookmark(lodgingId)
    : await addBookmark(lodgingId);
  await refreshBookmark();
}
</script>

<template>
  <section class="home pb-5">
    <h1 class="text-4xl font-bold mb-8">Home page</h1>
    <hr />
    <div class="mt-2 flex justify-end gap-3">
      <select
        name="typeId"
        id="typeId"
        class="w-48 rounded-full p-3 focus:border-none focus:outline-none focus:ring focus:ring-violet-300"
        v-model="typeId"
      >
        <option value="">All</option>
        <option v-for="type in types" :key="type.id" :value="type.id">
          {{ type.name }}
        </option>
      </select>
      <input
        @input="debounceSearch"
        type="text"
        placeholder="Search"
        class="w-48 rounded-full p-3 focus:border-none focus:outline-none focus:ring focus:ring-violet-300"
      />
    </div>
    <div v-if="pending" class="mt-2 flex justify-center">
      <Loader />
    </div>
    <div v-else class="mt-2 flex flex-wrap gap-5">
      <div class="w-90" v-for="(lodging, i) in data?.lodgings" :key="i">
        <CardLodging
          :lodging="lodging"
          :bookmarks="bookmarks"
          @bookmark-handle="bookmarkHandle"
        />
      </div>
    </div>

    <div class="mt-2 flex justify-end">
      <Paginate
        :current-page="currentPage"
        :total-page="data?.totalPage!"
        :set-page="setPage"
      />
    </div>
  </section>
</template>
