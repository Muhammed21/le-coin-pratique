// src/stores/useRemoveBtn.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRemoveBtn = defineStore('removeBtn', () => {
  const isRemoved = ref(false)
  const itemId = ref("")
  return { isRemoved, itemId } 
})
