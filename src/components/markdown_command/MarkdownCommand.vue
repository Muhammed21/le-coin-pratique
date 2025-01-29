<template>
  <div id="editor">
    <div v-if="containsCodeBlock">
      <SnippetBlock
        :editableCode="editableCode"
        :markdownIsActive="markdownIsActive"
        @removeSnippet="removeSnippet"
        @toggleMarkdownActive="toggleMarkdownActive"
      />
    </div>

    <CommandMenu :showCommandMenu="showCommandMenu" @executeCommand="executeCommand" />

    <div v-if="!containsCodeBlock && !containsExternalLinkBlock">
      <input
        v-model="input"
        @keyup.enter="handleInputChange"
        @keyup="handleKeyUp"
        placeholder="Écrivez quelque chose ou tapez '/' pour les commandes"
      />
    </div>

    <div v-if="containsExternalLinkBlock">
      <LinkBlock @removeLink="removeLink" />
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import SnippetBlock from './Snippet/SnippetBlock.vue'
import LinkBlock from './Link/LinkBlock.vue'
import { useInputStore } from '@/stores/useInputStore'
import CommandMenu from '../markdown_command/utils/CommandContext.vue'

export default {
  components: {
    SnippetBlock,
    LinkBlock,
    CommandMenu,
  },
  data() {
    return {
      input: '',
      containsCodeBlock: false,
      containsExternalLinkBlock: false,
      editableCode: '$ npm install --save stripe @stripe/stripe-js next',
      markdownIsActive: false,
      showCommandMenu: false,
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input)
    },
  },
  methods: {
    checkForCodeBlock() {
      const codeBlockRegex = /\/code/g
      this.containsCodeBlock = codeBlockRegex.test(this.input)
    },
    checkForLinkBlock() {
      const linkBlockRegex = /\/link/g
      this.containsExternalLinkBlock = linkBlockRegex.test(this.input)
    },
    handleInputChange() {
      this.checkForCodeBlock()
      this.checkForLinkBlock()
    },
    SaveInStore() {
      const inputStore = useInputStore() // Crée une instance du store
      inputStore.setInputValue(this.input)
      console.log(inputStore)
    },
    handleKeyUp(event) {
      if (event.key === '/') {
        this.showCommandMenu = true
      }
      if (event.key === 'Enter') {
        this.showCommandMenu = false
      }
      if (event.key === 'Backspace') {
        this.showCommandMenu = false
      }
      if (event.key === 'Escape') {
        this.showCommandMenu = false
      }
      this.SaveInStore()
    },
    executeCommand(command) {
      if (command === 'code') {
        this.input += '/code'
        this.containsCodeBlock = true
      } else if (command === 'link') {
        this.input += '/link'
        this.containsExternalLinkBlock = true
      }
      this.showCommandMenu = false
    },
    removeSnippet() {
      this.containsCodeBlock = false
      this.input = ''
    },
    removeLink() {
      this.containsExternalLinkBlock = false
      this.input = ''
    },
    toggleMarkdownActive(status) {
      this.markdownIsActive = status
    },
  },
}
</script>

<style scoped>
input {
  background-color: var(--background-color);
  padding: 3px;
  resize: none;
  color: var(--text-a1);
  border: none;
  font-size: 16px;
  font-family: 'SF Pro Regular';
  width: 640px;
  height: max-content;
}
input:focus {
  outline: none;
}

#editor {
  position: relative;
}
</style>
