import type { Lodging } from '@/schemas/lodging-schema';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { useGlobalStore } from './global';

export const useLodgingStore = defineStore('lodging', () => {
  const globalStore = useGlobalStore();
  const { request } = globalStore;

  const lodgings: Ref<Array<Lodging>> = ref([]);

  const lodging: Ref<Lodging | null> = ref(null);

  const formatPrice = computed<(price: number) => string>(
    () => (price: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  );

  async function getLodgings() {
    const { data } = await request({
      method: 'GET',
      url: '/lodgings',
      headers: {
        access_token: localStorage.access_token
      }
    });

    return data;
  }

  return { lodgings, lodging, formatPrice, getLodgings };
});
