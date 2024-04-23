<script setup lang="ts">
type PaginateProp = {
  currentPage: number;
  totalPage: number;
  setPage(page: number): void;
};

const { currentPage, totalPage, setPage } = defineProps<PaginateProp>();
</script>

<template>
  <div id="pagination" class="text-sky-500">
    <ul
      class="flex divide-x divide-slate-300 border border-slate-300 w-fit rounded overflow-hidden"
    >
      <li
        :class="{
          'bg-slate-300': currentPage == 1,
          'text-slate-500': currentPage == 1,
        }"
        class="page-item"
      >
        <a
          @click.prevent="setPage(currentPage - 1)"
          :class="{ 'pointer-events-none': currentPage == 1 }"
          class="w-9 h-7 inline-block text-center align-sub"
          href=""
        >
          &laquo;
        </a>
      </li>
      <li
        v-for="page in totalPage"
        :key="page"
        :class="{
          'bg-sky-500': currentPage == page,
          'text-white': currentPage == page,
          'hover:bg-slate-200': currentPage != page,
        }"
        class="page-item"
      >
        <a
          @click.prevent="setPage(page)"
          class="w-9 h-7 inline-block text-center align-sub"
          href=""
        >
          {{ page }}
        </a>
      </li>
      <li
        :class="{
          'bg-slate-300': currentPage == totalPage,
          'text-slate-500': currentPage == totalPage,
        }"
        class="page-item"
      >
        <a
          @click.prevent="setPage(currentPage + 1)"
          :class="{ 'pointer-events-none': currentPage == totalPage }"
          class="w-9 h-7 inline-block text-center align-sub"
          href=""
        >
          &raquo;
        </a>
      </li>
    </ul>
  </div>
</template>
