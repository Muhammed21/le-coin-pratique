<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownCommand from '../components/markdown_command/MarkdownCommand.vue'
import { useInputStore } from '@/stores/useInputStore'
import { getItem } from '@/stores/block_creator/getItem'

const markdownCommands = ref<any[]>([])
const activeMarkdown = ref<any[]>([])
const lastActiveId = ref<number[]>([])

const inputStore = useInputStore()

const addMarkdownCommand = (content: string = '', id: number | null = null) => {
  const newCommand = { id: id ?? Date.now(), content }
  markdownCommands.value.push(newCommand)
  console.log('MarkdownCommand ajouté avec id:', newCommand.id)
}

const saveInLocalStorage = (commandId: number) => {
  const command = markdownCommands.value.find((c) => c.id === commandId)
  if (command) {
    const updatedCommand = {
      id: command.id,
      content: inputStore.inputValue,
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

  saveInLocalStorageForActive()

  if (
    event.key === 'Backspace' &&
    markdownCommands.value.length > 1 &&
    inputStore.inputValue.length < 1
  ) {
    if (activeMarkdown.value.length > 0) {
      const lastActive = activeMarkdown.value.pop()
      deleteMarkdownCommand(lastActive)
      lastActiveId.value.push(lastActive)
    }
  }
}

const saveInLocalStorageForActive = () => {
  if (activeMarkdown.value.length > 0) {
    const activeId = activeMarkdown.value[activeMarkdown.value.length - 1]
    saveInLocalStorage(activeId)
  }
}

onMounted(() => {
  const { commandInLocalStorage } = getItem()

  commandInLocalStorage.forEach((elem: any) => {
    addMarkdownCommand(elem.content, elem.id)
    lastActiveId.value.push(elem.id)
    console.log(elem.content)
  })

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
      <MarkdownCommand :input="command.content" />
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
