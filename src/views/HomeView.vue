<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MarkdownCommand from '../components/markdown_command/MarkdownCommand.vue'
import Menu from '../components/menu_component/Menu.vue'
import { useInputStore } from '@/stores/useInputStore'
import { pageSelected } from '@/stores/menu/page_selected'

const markdownCommands = ref<{ id: number; content: string }[]>([]) // Tableau des commandes
const activeMarkdown = ref<number | null>(null) // Commande active
const inputStore = useInputStore()
const page_local = pageSelected()

const saveCommandsInLocalStorage = () => {
  localStorage.setItem(`command_${page_local.page_no}`, JSON.stringify(markdownCommands.value))
  console.log('Commandes sauvegardées dans localStorage :', markdownCommands.value)
}

const loadCommandsFromLocalStorage = () => {
  const savedCommands = localStorage.getItem(`command_${page_local.page_no}`)
  if (savedCommands) {
    markdownCommands.value = JSON.parse(savedCommands)
    console.log('Commandes chargées depuis localStorage :', markdownCommands.value)
  }
}

const addMarkdownCommand = (content: string = '', id: number | null = null) => {
  const newCommand = { id: id ?? Date.now(), content }
  markdownCommands.value.push(newCommand)
  saveCommandsInLocalStorage()
  console.log('Nouvelle commande ajoutée :', newCommand)
}

const deleteMarkdownCommand = (id: number) => {
  markdownCommands.value = markdownCommands.value.filter((command) => command.id !== id)
  saveCommandsInLocalStorage()
  console.log('Commande supprimée avec id :', id)
}

const updateActiveCommand = (id: number, content: string) => {
  const command = markdownCommands.value.find((c) => c.id === id)
  if (command) {
    command.content = content
    saveCommandsInLocalStorage()
    console.log('Commande mise à jour :', command)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && inputStore.inputValue.trim().length > 0) {
    addMarkdownCommand()
    inputStore.inputValue = ''
  }

  if (
    event.key === 'Backspace' &&
    markdownCommands.value.length > 1 &&
    inputStore.inputValue.trim().length === 0
  ) {
    if (activeMarkdown.value !== null) {
      deleteMarkdownCommand(activeMarkdown.value)
      activeMarkdown.value = null
    }
  }
}

const selectCommand = (commandId: number) => {
  activeMarkdown.value = commandId
  const command = markdownCommands.value.find((c) => c.id === commandId)
  if (command) {
    inputStore.inputValue = command.content
    console.log('Commande sélectionnée :', command)
  }
}

onMounted(() => {
  loadCommandsFromLocalStorage()
  if (markdownCommands.value.length === 0) {
    addMarkdownCommand()
  }
})

watch(
  () => page_local.page_no,
  () => {
    loadCommandsFromLocalStorage()
    console.log('Page changée, commandes rechargées pour la page', page_local.page_no)
  },
)
</script>

<template>
  <main @keyup="handleKeydown" tabindex="0" class="markdown_container">
    <div
      v-for="command in markdownCommands"
      :key="command.id"
      :class="{ active: command.id === activeMarkdown }"
      @click="selectCommand(command.id)"
    >
      <MarkdownCommand
        :input="command.content"
        @input="updateActiveCommand(command.id, $event.target.value)"
      />
    </div>
    <Menu />
  </main>
</template>

<style scoped>
.markdown_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media screen and (max-width: 720px) {
  .markdown_container {
    width: 100%;
  }
}
</style>
