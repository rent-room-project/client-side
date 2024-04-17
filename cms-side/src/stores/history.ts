import type { History } from '@/schemas/history-schema';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useHistoryStore = defineStore('history', () => {
  const histories: Ref<History[]> = ref([]);

  return { histories };
});
