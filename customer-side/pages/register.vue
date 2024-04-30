<script setup lang="ts">
import { ZodError } from "zod";

const isLogin = useIsLogin();
const isLoading = ref(false);

const form = reactive({
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
});

const fieldError = reactive({
  username: {
    msg: "",
    error: false,
  },
  email: {
    msg: "",
    error: false,
  },
  password: {
    msg: "",
    error: false,
  },
  phoneNumber: {
    msg: "",
    error: false,
  },
  address: {
    msg: "",
    error: false,
  },
});

async function register() {
  isLoading.value = true;
  clearError(fieldError);

  try {
    const payload = validate(registerSchema, form);

    const result = await $fetch("/api/register", {
      method: "POST",
      body: payload,
    });

    notif("Success", "Sign Up Successfully", "success");
    isLoading.value = false;
    navigateTo({
      path: "/login",
    });
  } catch (error) {
    notif("Failed", "Oops, something went wrong", "error");
    if (error instanceof ZodError) {
      setError(fieldError, error.formErrors.fieldErrors as Record<string, any>);
      console.log(fieldError);
    }
    isLoading.value = false;
  }
}

async function googleAuth(response: any) {
  isLoading.value = true;
  const result = await $fetch("/api/signInGoogle", {
    headers: {
      google_token: response.credential,
    },
  });

  localStorage.access_token = result.access_token;
  isLoading.value = false;
  navigateTo("/");
  isLogin.value = true;
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <PreLoader v-show="isLoading" />
    <div class="w-96">
      <Card class="p-6">
        <h1 class="text-center text-4xl font-bold mb-5">Register</h1>
        <form @submit.prevent="register" autocomplete="off">
          <div class="flex flex-col mb-5">
            <div class="flex flex-col mb-3">
              <label for="username">Username</label>
              <input
                v-model="form.username"
                class="focus:outline-none focus:ring focus:ring-violet-300 rounded border h-8"
                :class="{ 'border-rose-600': fieldError.username.error }"
                type="text"
                name="username"
                id="username"
              />
              <p
                v-show="fieldError.username.error"
                class="text-rose-600 text-xs"
              >
                {{ fieldError.username.msg }}
              </p>
            </div>
            <div class="flex flex-col mb-3">
              <label for="email">Email</label>
              <input
                v-model="form.email"
                class="focus:outline-none focus:ring focus:ring-violet-300 rounded border h-8"
                :class="{ 'border-rose-600': fieldError.email.error }"
                type="email"
                name="email"
                id="email"
              />
              <p v-show="fieldError.email.error" class="text-rose-600 text-xs">
                {{ fieldError.email.msg }}
              </p>
            </div>
            <div class="flex flex-col mb-3">
              <label for="password">Password</label>
              <input
                v-model="form.password"
                class="focus:outline-none focus:ring focus:ring-violet-300 rounded border h-8"
                :class="{ 'border-rose-600': fieldError.password.error }"
                type="password"
                name="password"
                id="password"
              />
              <p
                v-show="fieldError.password.error"
                class="text-rose-600 text-xs"
              >
                {{ fieldError.password.msg }}
              </p>
            </div>
            <div class="flex flex-col mb-3">
              <label for="address">Address</label>
              <input
                v-model="form.address"
                class="focus:outline-none focus:ring focus:ring-violet-300 rounded border h-8"
                :class="{ 'border-rose-600': fieldError.address.error }"
                type="text"
                name="address"
                id="address"
              />
              <p
                v-show="fieldError.address.error"
                class="text-rose-600 text-xs"
              >
                {{ fieldError.address.msg }}
              </p>
            </div>
            <div class="flex flex-col mb-3">
              <label for="phoneNumber">Phone Number</label>
              <input
                v-model="form.phoneNumber"
                class="focus:outline-none focus:ring focus:ring-violet-300 rounded border h-8"
                :class="{ 'border-rose-600': fieldError.phoneNumber.error }"
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
              />
              <p
                v-show="fieldError.phoneNumber.error"
                class="text-rose-600 text-xs"
              >
                {{ fieldError.phoneNumber.msg }}
              </p>
            </div>
          </div>

          <div class="flex flex-col">
            <button
              type="submit"
              class="bg-indigo-500 text-white p-1 rounded hover:bg-indigo-700"
            >
              Sign In
            </button>
            <p class="text-center">
              Already have an account?
              <NuxtLink to="/login" class="text-sky-500 hover:text-sky-700"
                >Sign In</NuxtLink
              >
            </p>
            <p class="text-center">Or</p>
            <div class="flex justify-center">
              <GoogleLogin :callback="googleAuth" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>
