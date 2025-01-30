<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownCommand from '../components/markdown_command/MarkdownCommand.vue'
import { useInputStore } from '@/stores/useInputStore'

const markdownCommands = ref<any[]>([])
const activeMarkdown = ref<any[]>([])

const inputStore = useInputStore()

const addMarkdownCommand = () => {
  const newCommand = { id: Date.now(), content: '' }
  markdownCommands.value.push(newCommand)
  console.log('MarkdownCommand ajouté avec id:', newCommand.id)
}

const saveInLocalStorage = (commandId: number) => {
  const command = markdownCommands.value.find((c) => c.id === commandId)
  if (command) {
    const updatedCommand = {
      id: command.id,
      content: inputStore.inputValue, // La valeur actuelle de l'input est stockée
    }
    console.log(updatedCommand)
    localStorage.setItem(`command_${command.id}`, JSON.stringify(updatedCommand))
  }
}

const deleteMarkdownCommand = (id: number) => {
  markdownCommands.value = markdownCommands.value.filter((command) => command.id !== id)
  console.log('MarkdownCommand supprimé avec id:', id)
  localStorage.removeItem(`command_${id}`)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && inputStore.inputValue.length > 0) {
    addMarkdownCommand()
  }

  // Sauvegarde au moment où l'input change
  saveInLocalStorageForActive()

  if (
    event.key === 'Backspace' &&
    markdownCommands.value.length > 1 &&
    inputStore.inputValue.length < 1
  ) {
    if (activeMarkdown.value.length > 0) {
      const lastActiveId = activeMarkdown.value[activeMarkdown.value.length - 1]
      deleteMarkdownCommand(lastActiveId)
      activeMarkdown.value.pop()
    }
  }
}

// Fonction pour sauvegarder la commande active
const saveInLocalStorageForActive = () => {
  if (activeMarkdown.value.length > 0) {
    const activeId = activeMarkdown.value[activeMarkdown.value.length - 1]
    saveInLocalStorage(activeId)
  }
}

onMounted(() => {
  const snippets = Object.keys(localStorage)
    .filter((key) => key.startsWith('command_')) // Assure-toi d'utiliser la bonne clé
    .map((key) => JSON.parse(localStorage.getItem(key)!))

  console.log(snippets)

  addMarkdownCommand()
})
</script>

<template>
  <main @keyup="handleKeydown" tabindex="0" class="markdown_container">
    <div
      v-for="command in markdownCommands"
      :key="command.id"
      @click="activeMarkdown.push(command.id)"
      @input="inputStore.inputValue = command.content"
    >
      <MarkdownCommand />
    </div>
  </main>
</template>

<style scoped>
.markdown_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
