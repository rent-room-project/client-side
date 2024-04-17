<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import Sidebar from '@/components/Sidebar.vue';
import router from '@/router';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import swal from 'sweetalert';
import { onBeforeMount, onMounted, ref } from 'vue';

const globalStore = useGlobalStore();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { isLoading } = storeToRefs(globalStore);
const { request } = globalStore;

onBeforeMount(async () => {
  try {
    const response = await request({
      url: '/',
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    });

    user.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      localStorage.clear();
      swal(error.response.statusText, error.response.data.message, 'error');
      router.push('/login');
    }
  }
});
</script>

<template>
  <Loader v-show="isLoading" />
  <main class="container">
    <Sidebar />
    <RouterView />
  </main>
</template>

<style scoped>
main.container {
  display: flex;
  min-height: 100vh;
}
</style>
