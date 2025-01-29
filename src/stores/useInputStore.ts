// src/stores/useInputStore.ts
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useInputStore = defineStore('inputStore', {
  state: () => {
    return {
      inputValue: ref('') as Ref<string>  // Déclare une variable de type string
    }
  },
  actions: {
    setInputValue(value: string) {
      this.inputValue = value
    }
  }
})
