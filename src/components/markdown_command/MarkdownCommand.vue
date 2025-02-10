<template>
  <div id="editor">
    <div v-if="containsCodeBlock">
      <SnippetBlock
        :editableCode="editableCode"
        :markdownIsActive="markdownIsActive"
        @removeSnippet="removeSnippet"
      />
    </div>

    <CommandMenu :showCommandMenu="showCommandMenu" @executeCommand="executeCommand" />

    <div v-if="!containsCodeBlock && !containsExternalLinkBlock && !containsMarkdown">
      <input
        ref="inputElement"
        v-model="localInput"
        @keyup.enter="handleInputChange"
        @keyup="handleKeyUp"
        placeholder="Écrivez quelque chose ou tapez '/' pour les commandes"
      />
    </div>
    <div
      class="compiledmarkdown_container"
      v-if="containsMarkdown && !containsCodeBlock && !containsExternalLinkBlock"
    >
      <div class="edit-button" @click="handleRemoveMarkdown">
        <img src="../../assets/svg/input.svg" style="width: 16px; height: 16px" />
      </div>
      <div v-html="compiledMarkdown" class="markdown-output"></div>
    </div>

    <div v-if="containsExternalLinkBlock">
      <LinkBlock @removeLink="removeLink" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'
import SnippetBlock from './Snippet/SnippetBlock.vue'
import LinkBlock from './Link/LinkBlock.vue'
import { useInputStore } from '@/stores/useInputStore'
import CommandMenu from '../markdown_command/utils/CommandContext.vue'

const props = defineProps({
  input: String,
})

const emit = defineEmits(['update:input'])

const localInput = ref(props.input || '')
const containsCodeBlock = ref(false)
const containsExternalLinkBlock = ref(false)
const editableCode = ref('$ npm install --save stripe @stripe/stripe-js next')
const markdownIsActive = ref(false)
const containsMarkdown = ref(false)
const showCommandMenu = ref(false)
const inputElement = ref(null)

const compiledMarkdown = computed(() => marked(localInput.value))

watch(localInput, (newValue) => {
  emit('update:input', newValue)
})

const checkForCodeBlock = () => {
  const codeBlockRegex = /\/code/g
  containsCodeBlock.value = codeBlockRegex.test(localInput.value)
}

const checkMarkdownActive = () => {
  const markdownRegex = /[#*-`~]/g
  containsMarkdown.value = markdownRegex.test(localInput.value)
}

const checkForLinkBlock = () => {
  const linkBlockRegex = /\/link/g
  containsExternalLinkBlock.value = linkBlockRegex.test(localInput.value)
}

const handleInputChange = () => {
  checkForCodeBlock()
  checkForLinkBlock()
  checkMarkdownActive()
}

const handleRemoveMarkdown = () => {
  containsMarkdown.value = false
}

const SaveInStore = () => {
  const inputStore = useInputStore()
  inputStore.setInputValue(localInput.value)
}

const handleKeyUp = (event) => {
  if (event.key === '/') {
    showCommandMenu.value = true
  }
  if (['Enter', 'Backspace', 'Escape'].includes(event.key)) {
    showCommandMenu.value = false
  }
  SaveInStore()
}

const executeCommand = (command) => {
  if (command === 'code') {
    localInput.value += '/code'
    containsCodeBlock.value = true
  }
  if (command === 'link') {
    localInput.value += '/link'
    containsExternalLinkBlock.value = true
  }
  if (command === 'H1') {
    localInput.value = '# H1'
    containsMarkdown.value = true
  }
  if (command === 'H2') {
    localInput.value = '## H2'
    containsMarkdown.value = true
  }
  if (command === 'H3') {
    localInput.value = '### H3'
    containsMarkdown.value = true
  }
  showCommandMenu.value = false
}

const removeSnippet = () => {
  containsCodeBlock.value = false
  localInput.value = ''
}

const removeLink = () => {
  containsExternalLinkBlock.value = false
  localInput.value = ''
}

onMounted(() => {
  if (inputElement.value) {
    const event = new KeyboardEvent('keyup', { key: 'Enter' })
    inputElement.value.dispatchEvent(event)
  }
})
</script>

<style scoped>
input {
  background-color: var(--background-color);
  padding: 6px 10px;
  transition: all 150ms ease-in-out;
  resize: none;
  color: var(--text-a1);
  border: none;
  font-size: 16px;
  font-family: 'SF Pro Regular';
  width: 640px;
  height: max-content;
}

@media screen and (max-width: 720px) {
  input {
    width: 100%;
  }
}

input:focus {
  outline: none;
}

input:hover,
.compiledmarkdown_container:hover {
  background-color: #27272aa2;
  border-radius: 8px;
  transition: all 150ms ease-in-out;
  cursor: text;
}

.compiledmarkdown_container {
  display: flex;
  position: relative;
}

.markdown-output {
  padding: 6px 10px;
  transition: all 150ms ease-in-out;
  width: 640px;
  color: var(--white);
}

@media screen and (max-width: 720px) {
  .markdown-output {
    width: 100%;
  }
}

.edit-button {
  opacity: 0;
  transition: all 200ms ease-in-out;
  position: absolute;
  display: grid;
  place-content: center;
  top: 5px;
  left: -40px;
  width: 25px;
  height: 25px;
  background-color: var(--block-background);
  color: var(--white);
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #3f3f44;
}

.compiledmarkdown_container:hover .edit-button {
  opacity: 1;
  transition: all 200ms ease-in-out;
}

#editor {
  position: relative;
  width: 640px;
}

@media screen and (max-width: 720px) {
  #editor {
    width: 100%;
  }
}

</style>
