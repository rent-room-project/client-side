import type { User } from '@/schemas/user-schema';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null);

  return { user };
});
