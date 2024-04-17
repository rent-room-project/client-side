<script setup lang="ts">
import router from '@/router';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import swal from 'sweetalert';

const globalStore = useGlobalStore();

const { isLogin } = storeToRefs(globalStore);

function logout() {
  localStorage.clear();
  isLogin.value = false;
  swal('Successfully', 'Sign out successfully', 'success');
  router.push('/login');
}
</script>

<template>
  <aside class="sidebar">
    <h3>Dashboard</h3>
    <hr />
    <ul>
      <li>
        <RouterLink to="/">
          <i class="bi bi-speedometer2"></i>
          Dashboard
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/lodgings">
          <i class="bi bi-building"></i>
          Lodging
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/types">
          <i class="bi bi-tags"></i>
          Type
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/histories">
          <i class="bi bi-clock-history"></i>
          History
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="sidebar-btn">
      <a href="" @click.prevent="logout">
        <i class="bi bi-box-arrow-right"></i>
        Logout
      </a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: black;
  color: #eee;
  padding: 20px;
  box-sizing: border-box;
}

hr {
  border-top: 1px solid #d9edbf;
}

a {
  text-decoration: none;
  color: #eee;
}

h3 a {
  text-decoration: none;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

li a {
  display: block;
  text-decoration: none;
  padding: 5px;
}

ul a,
.sidebar-btn a {
  font-size: 18px;
}

.sidebar-btn {
  padding: 5px;
}
</style>
