<script setup lang="ts">
import { useTypeStore } from '@/stores/type';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useGlobalStore } from '../stores/global';

const typeStore = useTypeStore();
const globalStore = useGlobalStore();

const { types } = storeToRefs(typeStore);
const { request, setLoader } = globalStore;

onBeforeMount(async () => {
  setLoader(true);

  try {
    const { data } = await request({
      method: 'GET',
      url: '/types',
      headers: {
        access_token: localStorage.access_token
      }
    });

    types.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <section class="main-content">
    <header class="header">
      <h1 class="title">Type</h1>
    </header>

    <hr />
    <main>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(type, i) in types" :key="type.id">
            <td>{{ i + 1 }}</td>
            <td>{{ type.name }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </section>
</template>
