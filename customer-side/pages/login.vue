<script setup lang="ts">
import { ZodError } from "zod";

const isLogin = useIsLogin();
const isLoading = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const fieldError = reactive({
  email: {
    msg: "",
    error: false,
  },
  password: {
    msg: "",
    error: false,
  },
});

async function login() {
  isLoading.value = true;
  clearError(fieldError);

  try {
    const payload = validate(loginSchema, form);

    const result = await $fetch("/api/login", {
      method: "POST",
      body: payload,
    });

    localStorage.access_token = result.access_token;
    isLogin.value = true;
    notif("Success", "Sign In Successfully", "success");
    isLoading.value = false;
    navigateTo({
      path: "/",
    });
  } catch (error: any) {
    notif("Failed", "Oopps, something went wrong", "error");
    if (error instanceof ZodError) {
      setError(fieldError, error.formErrors.fieldErrors as Record<string, any>);
    }
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <PreLoader v-show="isLoading" />
    <div class="w-96">
      <Card class="p-8">
        <h1 class="text-center text-4xl font-bold mb-5">Login</h1>
        <form @submit.prevent="login" autocomplete="off">
          <div class="flex flex-col mb-5">
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
              <p v-show="fieldError.email.error" class="text-xs text-rose-600">
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
                class="text-xs text-rose-600"
              >
                {{ fieldError.password.msg }}
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
              Don't have an account?
              <NuxtLink to="/register" class="text-sky-500 hover:text-sky-700"
                >Sign Up</NuxtLink
              >
            </p>
            <p class="text-center">Or</p>
            <div class="flex justify-center">
              <GoogleLogin />
            </div>
            <p class="text-center mt-2">
              Want to search the Accomodation first?
              <NuxtLink to="/" class="text-sky-500 hover:text-sky-700"
                >Back to home</NuxtLink
              >
            </p>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>
