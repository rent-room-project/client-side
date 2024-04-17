<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import { useLodgingStore } from '@/stores/lodging';
import { useUserStore } from '@/stores/user';
import { AxiosError } from 'axios';
import { storeToRefs } from 'pinia';
import swal from 'sweetalert';
import { computed, onBeforeMount, ref } from 'vue';

const lodgingStore = useLodgingStore();
const globalStore = useGlobalStore();
const userStore = useUserStore();

const { request, setLoader } = globalStore;
const { user } = storeToRefs(userStore);
const { getLodgings } = lodgingStore;
const { lodgings, formatPrice } = storeToRefs(lodgingStore);
const statuses = ref(['Active', 'Inactive', 'Archived']);

const editUrl = computed(() => (id: string) => `/lodgings/${id}`);

function isAuthorized(id: string) {
  return id === user.value?.id || user.value?.role === 'Admin';
}

async function updateStatus(id: string, status: string) {
  setLoader(true);

  try {
    await request({
      method: 'PATCH',
      url: `/lodgings/${id}`,
      data: { status },
      headers: {
        access_token: localStorage.access_token
      }
    });

    lodgings.value = await getLodgings();

    swal('Successfully', 'Update Status Lodging Successfully', 'success');
  } catch (error) {
    if (error instanceof AxiosError) {
      swal('Failed', error.response?.data.message, 'error');
    }
  } finally {
    setLoader(false);
  }
}

async function destroy(id: string) {
  setLoader(true);

  try {
    await request({
      method: 'DELETE',
      url: `/lodgings/${id}`,
      headers: {
        access_token: localStorage.access_token
      }
    });

    const { data } = await request({
      method: 'GET',
      url: '/lodgings',
      headers: {
        access_token: localStorage.access_token
      }
    });

    lodgings.value = data;
    swal('Successfully', 'Delete Lodging Successfully', 'success');
  } catch (error) {
    if (error instanceof AxiosError) {
      swal('Failed', error.response?.data.message, 'error');
    }
  } finally {
    setLoader(false);
  }
}

onBeforeMount(async () => {
  setLoader(true);

  try {
    const { data } = await request({
      method: 'GET',
      url: '/lodgings',
      headers: {
        access_token: localStorage.access_token
      }
    });

    lodgings.value = data;
  } catch (error: any) {
    swal('Error', error.message, 'error');
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <section class="main-content">
    <header class="header">
      <h1 class="title">Lodging</h1>
      <RouterLink to="/lodgings/create" class="btn btn-primary align-center">Create</RouterLink>
    </header>
    <hr />

    <main>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Facility</th>
            <th>Room Capacity</th>
            <th>Price</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lodging, i) in lodgings" :key="lodging.id">
            <td>{{ i + 1 }}</td>
            <td>{{ lodging.name }}</td>
            <td><img :src="lodging.imgUrl" :alt="lodging.name" width="200" /></td>
            <td>{{ lodging.facility }}</td>
            <td>{{ lodging.roomCapacity }}</td>
            <td>{{ formatPrice(lodging.price) }}</td>
            <td>{{ lodging.Author.username }}</td>
            <td>
              <div class="table-button">
                <RouterLink
                  :to="editUrl(lodging.id)"
                  class="btn btn-warning"
                  v-show="isAuthorized(lodging.Author.id)"
                  >Edit</RouterLink
                >
                <button
                  @click="destroy(lodging.id)"
                  class="btn btn-danger"
                  v-show="isAuthorized(lodging.Author.id)"
                >
                  Delete
                </button>
                <div class="dropdown" v-show="isAuthorized(lodging.Author.id)">
                  <button class="btn btn-primary">
                    {{ lodging.status }}
                  </button>
                  <ul class="dropdown-content">
                    <li v-for="(status, i) in statuses" :key="i" v-show="status !== lodging.status">
                      <button @click="updateStatus(lodging.id, status)" class="dropdown-btn">
                        {{ status }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </section>
</template>

<style scoped>
.table-button {
  display: flex;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 100px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown .dropdown-btn {
  border: none;
  min-width: 100%;
  font-size: 15px;
  background-color: #f9f9f9;
  text-align: left;
  padding: 5px;
}

.dropdown-btn:hover {
  background-color: #e8efcf;
}
</style>
