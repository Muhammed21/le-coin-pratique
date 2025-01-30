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
        @keyup="saveSnippet"
        class="markdown-render"
        :value="snippetContent"
        :placeholder="editableCode"
      ></textarea>
      <div class="remove-button" @click="handleRemoveSnippet">
        <img src="../../../assets/svg/corbeille.svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useSnippetStore } from '../../../stores/snippet/localStorageLogique.ts';

defineProps<{ editableCode: string; markdownIsActive: boolean }>();
const emit = defineEmits(['toggleMarkdownActive', 'removeSnippet', 'update:editableCode']);

const snippetStore = useSnippetStore();
const snippetId = ref<string>(Date.now().toString());

const snippetContent = computed(() => snippetStore.getSnippet(snippetId.value));

const toggleMarkdownActive = (status: boolean) => {
  emit('toggleMarkdownActive', status);
};

const handleRemoveSnippet = () => {
  snippetStore.removeSnippet(snippetId.value);
  emit('removeSnippet');
};

const updateEditableCode = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:editableCode', target.value);
};

const saveSnippet = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  snippetStore.saveSnippet(snippetId.value, target.value);
};

onMounted(() => {
  snippetContent.value;
});
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
