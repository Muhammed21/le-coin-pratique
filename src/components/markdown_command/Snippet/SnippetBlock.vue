<template>
  <div class="snippet_wrapper">
    <div class="rect_hover"></div>
    <div
      class="snippet_block"
      @mouseover="toggleMarkdownActive(true)"
      @mouseleave="toggleMarkdownActive(false)"
    >
      <p>Snippet</p>
      <textarea
        @input="updateEditableCode"
        @keyup="saveInLocalStorage($event)"
        class="markdown-render"
        :value="Verification()"
        :placeholder="editableCode"
      ></textarea>
      <!-- Bouton pour supprimer -->
      <div class="remove-button" @click="handleRemoveSnippet">
        <img src="../../../assets/svg/corbeille.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRemoveBtn } from '@/stores/removeItem'

export default {
  props: {
    editableCode: {
      type: String,
      required: true,
    },
    markdownIsActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      snippetId: Date.now().toString(), // ID unique pour chaque snippet
    }
  },
  methods: {
    toggleMarkdownActive(status) {
      this.$emit('toggleMarkdownActive', status)
    },
    handleRemoveSnippet() {
      const removeBtnStore = useRemoveBtn()
      this.$emit('removeSnippet')

      removeBtnStore.isRemoved = true
      console.log(removeBtnStore.isRemoved)
      if (removeBtnStore.isRemoved) {
        localStorage.removeItem(`snippet_${this.snippetId}`)
        removeBtnStore.isRemoved = false
        console.log(removeBtnStore.isRemoved)
      }
    },
    updateEditableCode(event) {
      this.$emit('update:editableCode', event.target.value)
    },
    saveInLocalStorage(event) {
      const snippet = {
        id: this.snippetId,
        content: event.target.value,
      }
      localStorage.setItem(`snippet_${this.snippetId}`, JSON.stringify(snippet))
    },
    Verification() {
      const storedSnippet = localStorage.getItem(`snippet_${this.snippetId}`)
      const snippet = storedSnippet ? JSON.parse(storedSnippet) : null
      return snippet ? snippet.content : ''
    },
  },
}
</script>

<style scoped>
textarea {
  background-color: var(--block-background);
  resize: vertical;
  font-family: 'SF Pro Regular';
  color: var(--white);
  border: none;
  height: max-content;
}
textarea:focus {
  outline: none;
}

.markdown-render {
  display: flex;
  background-color: var(--markdown-background);
  border: 1px solid var(--white-06);
  padding: 12px 16px;
  height: max-content;
  width: 100%;
  border-radius: 8px;
}

.snippet_block {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 640px;
  height: max-content;
  padding: 10px;
  background-color: var(--block-background);
  border: 1px solid var(--white-06);
  border-radius: 10px;
  position: relative;
}

.snippet_block p {
  color: var(--white-50);
  font-size: 12px;
}

.snippet_wrapper:hover .rect_hover,
.snippet_block:hover .remove-button {
  opacity: 1;
  transition: all 200ms ease-in-out;
}
</style>
