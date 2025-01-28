<template>
  <div class="snippet_container">
    <input v-model="text" class="editable-input" :placeholder="placeholderText" />
    <span>test</span>
  </div>
</template>

<script>
export default {
  props: ['children'],
  data() {
    return {
      text: this.children,
      placeholderText: 'Entrez du texte ici...',
    }
  },
}
</script>

<style scoped>
.snippet_container {
  display: flex;
}
.editable-input {
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  color: #333;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.editable-input::placeholder {
  color: #aaa;
}

.editable-input:focus {
  outline: none;
}
</style>
