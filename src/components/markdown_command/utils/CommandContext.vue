<template>
  <div v-if="showCommandMenu" class="command-menu">
    <span>Command menu</span>
    <ul>
      <li @click="executeCommand('code')"><img src="../../../assets/svg/code.svg" />Snippet</li>
      <li @click="executeCommand('link')">
        <img src="../../../assets/svg/link.svg" />Lien Externe
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    showCommandMenu: Boolean,
  },
  methods: {
    executeCommand(command) {
      this.$emit('executeCommand', command)
    },
  },
}
</script>

<style scoped>
.command-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 12px;
  bottom: 40px;
  left: 10px;
  background-color: var(--block-background);
  border: 1px solid var(--white-10);
  border-radius: 5px;
  width: 200px;
  z-index: 10;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.command-menu span {
  padding: 5px 0 0 5px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: 'SF Pro semibold';
}

.command-menu ul {
  display: flex;
  flex-direction: column;
  gap: 7px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.command-menu li {
  transition: all 200ms ease-in-out;
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-f4);
}

.command-menu img {
  width: 18px;
  aspect-ratio: 1/1;
}

.command-menu li:hover {
  transition: all 200ms ease-in-out;
  background-color: var(--white-05);
  border-radius: 5px;
}
</style>
