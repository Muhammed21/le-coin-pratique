import { defineStore } from 'pinia'
import { ref } from 'vue'

export const pageSelected = defineStore('pageBtn', () => {
  const page_no = ref(1)
  console.log('page pinia', page_no)
  return { page_no }
})
