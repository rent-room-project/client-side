<script setup lang="ts">
import { useHistoryStore } from '@/stores/history';
import { useGlobalStore } from '../stores/global';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const globalStore = useGlobalStore();
const historyStore = useHistoryStore();

const { setLoader, request } = globalStore;
const { histories } = storeToRefs(historyStore);

onBeforeMount(async () => {
  setLoader(true);

  try {
    const { data } = await request({
      method: 'GET',
      url: '/histories',
      headers: {
        access_token: localStorage.access_token
      }
    });

    histories.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <section class="main-content">
    <header>
      <h1 class="title">History</h1>
    </header>

    <hr />

    <main>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Updated By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, i) in histories" :key="history.id">
            <td>{{ i + 1 }}</td>
            <td>{{ history.title }}</td>
            <td>{{ history.description }}</td>
            <td>{{ history.updatedBy }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </section>
</template>
