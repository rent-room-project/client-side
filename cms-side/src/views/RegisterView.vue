<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import { ref } from 'vue';
import { useGlobalStore } from '../stores/global';
import { storeToRefs } from 'pinia';
import swal from 'sweetalert';
import router from '@/router';
import Loader from '@/components/Loader.vue';
import { userSchema } from '@/schemas/user-schema';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import { GoogleLogin } from 'vue3-google-login';

const global = useGlobalStore();

const { request, validate, clearError, setError } = global;

const form = ref({
  username: '',
  email: '',
  password: '',
  address: '',
  phoneNumber: ''
});

const fieldError = ref({
  username: {
    msg: '',
    error: false
  },
  email: {
    msg: '',
    error: false
  },
  password: {
    msg: '',
    error: false
  },
  address: {
    msg: '',
    error: false
  },
  phoneNumber: {
    msg: '',
    error: false
  }
});

const isLoading = ref(false);

async function register() {
  clearError(fieldError.value);
  isLoading.value = true;

  try {
    const payload = validate(userSchema, form.value);

    const { data } = await request({
      url: '/register',
      method: 'POST',
      data: payload
    });

    isLoading.value = false;
    router.push('/login');
    swal('Successfully', 'You are now regiestered', 'success');
  } catch (error: any) {
    console.log(error);
    isLoading.value = false;
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
      <h1>Register</h1>
      <form autocomplete="off" @submit.prevent="register">
        <div class="form-input">
          <InputComponent
            type="text"
            name="username"
            place-holder="Username"
            v-model="form.username"
            :is-invalid="fieldError.username.error"
          />
          <div v-show="fieldError.username.error" class="invalid-feedback">
            {{ fieldError.username.msg }}
          </div>
          <InputComponent
            type="email"
            name="email"
            place-holder="Email Address"
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
          <InputComponent
            type="text"
            name="address"
            place-holder="Address"
            v-model="form.address"
            :is-invalid="fieldError.address.error"
          />
          <div v-show="fieldError.address.error" class="invalid-feedback">
            {{ fieldError.address.msg }}
          </div>
          <InputComponent
            type="tel"
            name="phoneNumber"
            place-holder="Phone Number"
            v-model="form.phoneNumber"
            :is-invalid="fieldError.phoneNumber.error"
          />
          <div v-show="fieldError.phoneNumber.error" class="invalid-feedback">
            {{ fieldError.phoneNumber.msg }}
          </div>
        </div>

        <button type="submit">Register</button>
        <p>Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
        <p class="text-center">Or</p>
        <div class="google-signin">
          <GoogleLogin :callback="googleAuth" />
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.google-signin {
  margin: auto;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  margin: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  height: 600px;
}

form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 300px;
  min-height: 300px;
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
</style>
