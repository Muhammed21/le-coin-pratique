<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownCommand from '../components/markdown_command/MarkdownCommand.vue'
import { useInputStore } from '@/stores/useInputStore'

const markdownCommands = ref<any[]>([])
const activeMarkdown = ref<any[]>([])

const inputStore = useInputStore()

const addMarkdownCommand = () => {
  const newCommand = { id: Date.now() }
  markdownCommands.value.push(newCommand)
  console.log('MarkdownCommand ajouté avec id:', newCommand.id)
}

const deleteMarkdownCommand = (id: number) => {
  markdownCommands.value = markdownCommands.value.filter((command) => command.id !== id)
  console.log('MarkdownCommand supprimé avec id:', id)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && inputStore.inputValue.length > 0) {
    addMarkdownCommand()
  }

  if (
    event.key === 'Backspace' &&
    markdownCommands.value.length > 1 &&
    inputStore.inputValue.length < 1
  ) {
    if (activeMarkdown.value.length >= 0) {
      const formatToNumber = parseInt(
        activeMarkdown.value[activeMarkdown.value.length - 1].toString(),
        10,
      )
      console.log('Active Markdown:', activeMarkdown.value)
      deleteMarkdownCommand(formatToNumber)
      activeMarkdown.value.pop()
    }
  }
}

onMounted(() => {
  addMarkdownCommand()
})
</script>

<template>
  <main @keydown="handleKeydown" tabindex="0" class="markdown_container">
    <div
      v-for="command in markdownCommands"
      :key="command.id"
      @click="activeMarkdown.push(command.id)"
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
