<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useGlobalStore } from '../stores/global';
import Loader from '@/components/Loader.vue';
import Card from '@/components/Card.vue';

const userStore = useUserStore();
const globalStore = useGlobalStore();

const { request, setLoader } = globalStore;
const { user } = storeToRefs(userStore);

const totalLodging = ref(0);
const totalType = ref(0);

onBeforeMount(async () => {
  setLoader(true);

  try {
    const [{ data: lodgings }, { data: types }] = await Promise.all([
      request({
        url: '/lodgings',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      }),
      request({
        url: '/types',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
    ]);

    totalLodging.value = lodgings.length;
    totalType.value = types.length;
  } catch (error: any) {
    console.log(error);
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <section class="main-content">
    <h1 class="title">Welcome, {{ user?.username }}</h1>
    <hr />

    <div class="cards">
      <Card :total="totalLodging" name="Lodging" />
      <Card :total="totalType" name="Types" />
    </div>
  </section>
</template>

<style scoped>
hr {
  border-top: 1px solid gray;
}

.cards {
  display: flex;
  gap: 20px;
}
</style>
