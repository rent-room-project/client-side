<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import Loader from '@/components/Loader.vue';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import swal from 'sweetalert';
import { ref } from 'vue';
import router from '@/router';
import { loginSchema } from '@/schemas/user-schema';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import { GoogleLogin } from 'vue3-google-login';

const global = useGlobalStore();

const { isLogin } = storeToRefs(global);
const isLoading = ref(false);

const { request, validate, setError, clearError } = global;

const form = ref({
  email: '',
  password: ''
});

const fieldError = ref({
  email: {
    msg: '',
    error: false
  },
  password: {
    msg: '',
    error: false
  }
});

async function login() {
  clearError(fieldError.value);
  isLoading.value = true;

  try {
    const payload = validate(loginSchema, form.value);

    const { data } = await request({
      method: 'post',
      url: '/login',
      data: payload
    });

    localStorage.access_token = data.access_token;
    isLogin.value = true;
    isLoading.value = false;
    swal('Successfully', 'Sign in successfully', 'success');

    router.push('/');
  } catch (error: any) {
    isLoading.value = false;
    console.log(error);

    if (error instanceof ZodError) {
      setError(fieldError.value, error.flatten().fieldErrors as Record<string, any>);
    } else if (error instanceof AxiosError) {
      swal('Failed', error.message, 'error');
    }
  }
}

async function googleAuth(response: any) {
  isLoading.value = true;

  try {
    const { data } = await request({
      method: 'POST',
      url: '/google-login',
      headers: {
        google_token: response.credential
      }
    });

    localStorage.access_token = data.access_token;
    swal('Successfully', 'Sign In with Google successfully', 'success');
    isLoading.value = false;

    router.push('/');
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
}
</script>

<template>
  <main>
    <Loader v-show="isLoading" />
    <div class="card">
      <h1>Login</h1>
      <form autocomplete="off" @submit.prevent="login">
        <div class="form-input">
          <InputComponent
            type="email"
            name="email"
            place-holder="Email"
            v-model="form.email"
            :is-invalid="fieldError.email.error"
          />
          <div v-show="fieldError.email.error" class="invalid-feedback">
            {{ fieldError.email.msg }}
          </div>
          <InputComponent
            type="password"
            name="password"
            place-holder="Password"
            v-model="form.password"
            :is-invalid="fieldError.password.error"
          />
          <div v-show="fieldError.password.error" class="invalid-feedback">
            {{ fieldError.password.msg }}
          </div>
        </div>

        <button type="submit">Sign In</button>
        <p>Don't have an Account? <RouterLink to="/register">Sign up</RouterLink></p>
        <p class="text-center">Or</p>
        <div class="google-signin">
          <GoogleLogin :callback="googleAuth" />
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  min-height: 400px;
  padding: 20px;
  box-sizing: border-box;
}

form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 300px;
  min-height: 200px;
}

.form-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

button {
  border: none;
  background-color: #90d26d;
  padding: 12px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  cursor: pointer;
  background-color: #d9edbf;
}

p {
  text-align: center;
}

a {
  text-decoration: none;
  color: #90d26d;
}

.google-signin {
  margin: auto;
}
</style>
