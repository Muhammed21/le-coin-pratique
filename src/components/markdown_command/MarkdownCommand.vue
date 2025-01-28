<template>
  <div id="editor">
    <div v-if="containsCodeBlock" class="snippet_block">
      <p>Snippet</p>
      <span class="markdown-render" v-html="formatInput"></span>
    </div>
    <div v-else="containsCodeBlock">
      <textarea v-model="input" @input="checkForCodeBlock"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { marked } from 'marked'
import SnippetBlock from './Snippet/SnippetBlock.vue'

export default {
  components: {
    SnippetBlock,
  },
  data() {
    return {
      input: '# hello',
      containsCodeBlock: false,
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input)
    },
    formatInput() {
      const codeBlockRegex = /!-(.*?)-!/g
      const match = codeBlockRegex.exec(this.input)
      if (match && match[1]) {
        return match[1]
      }
      return ''
    },
  },
  methods: {
    checkForCodeBlock() {
      const codeBlockRegex = /!-[\s\S]*?-!/g
      this.containsCodeBlock = codeBlockRegex.test(this.input)
    },
  },
}
</script>

<style scoped>
textarea {
  background-color: #27272a;
  resize: none;
  color: white;
  border: none;
  height: max-content;
}
textarea:focus {
  outline: none;
}
#editor {
  display: flex;
  padding: 150px 200px;
  width: 100%;
  flex-direction: column;
}
.markdown-render {
  display: flex;
  background-color: #2f2f32;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 16px;
  height: max-content;
  width: 100%;
  border-radius: 12px;
}
.snippet_block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 640px;
  width: 100%;
  height: max-content;
  padding: 10px;
  background-color: #27272a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.snippet_block p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.snippet_block span {
  font-size: 12px;
  color: #fafafa;
}
</style>
