import type { Type } from '@/schemas/type-schema'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useTypeStore = defineStore('type', () => {
  const types: Ref<Array<Type>> = ref([])

  return { types }
})
