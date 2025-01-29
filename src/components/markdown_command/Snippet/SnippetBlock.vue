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
        @input="updateEditableCode($event)"
        @keyup.enter="SaveInLocalStorage($event)"
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
export default {
  props: {
    editableCode: String,
    markdownIsActive: Boolean,
  },
  methods: {
    toggleMarkdownActive(status) {
      this.$emit('toggleMarkdownActive', status)
    },
    handleRemoveSnippet() {
      this.$emit('removeSnippet')
    },
    updateEditableCode(event) {
      this.$emit('update:editableCode', event.target.value)
    },
    SaveInLocalStorage(event) {
      //   console.log(event.target.value)
      localStorage.setItem('snippet_content', event.target.value)
    },
    Verification() {
      const getItem = localStorage.getItem('snippet_content')
      const verification = getItem ? getItem : ''
      return verification
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
