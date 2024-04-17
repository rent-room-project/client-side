import type { FieldError } from '@/schemas/error-schema';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ZodType } from 'zod';

export const useGlobalStore = defineStore('global', () => {
  const request = axios.create({
    baseURL: 'https://server-side-production-906b.up.railway.app'
  });

  function validate<T>(schema: ZodType, payload: T) {
    return schema.parse(payload);
  }

  function clearError(fieldError: Record<string, FieldError>) {
    for (const field in fieldError) {
      fieldError[field].msg = '';
      fieldError[field].error = false;
    }
  }

  function setError(fieldError: Record<string, FieldError>, flatten: Record<string, string[]>) {
    for (const field in flatten) {
      fieldError[field].msg = flatten[field][0];
      fieldError[field].error = true;
    }
  }

  const isLoading = ref(false);

  function setLoader(params: boolean) {
    isLoading.value = params;
  }

  const isLogin = ref(false);

  return { request, isLogin, isLoading, validate, clearError, setError, setLoader };
});
