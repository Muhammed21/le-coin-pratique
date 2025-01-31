import { defineStore } from 'pinia'
import { ref } from 'vue'

export const getItem = defineStore('getItem', () => {
  
  const commandInLocalStorage = ref<any>([])

  const snippets = Object.keys(localStorage)
    .filter((key) => key.startsWith('command_'))
    .map((key) => JSON.parse(localStorage.getItem(key)!))

  commandInLocalStorage.value = snippets

  return { commandInLocalStorage }
})
