<template>
  <div class="link_container">
    <div class="rect_hover_link"></div>
    <div class="left_part">
      <img src="../../../assets/svg/GithubIllustration.svg" alt="Github Illustration" />
      <div class="text_grup">
        <span>Example Repository Github</span>
        <input
          :value="Verification()"
          placeholder="Insérez du text"
          @keyup.enter="SaveInLocalStorage($event)"
        />
      </div>
    </div>
    <img src="../../../assets/svg/ExternLink.svg" alt="Extern link" />
    <!-- Bouton pour supprimer -->
    <div class="remove-button" @click="handleRemoveLink">
      <img src="../../../assets/svg/corbeille.svg" />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleRemoveLink() {
      this.$emit('removeLink')
    },
    SaveInLocalStorage(event) {
      //   console.log(event.target.value)
      localStorage.setItem('desc', event.target.value)
    },
    Verification() {
      const getItem = localStorage.getItem('desc')
      const verification = getItem ? getItem : ''
      return verification
    },
  },
}
</script>
<style scoped>
.link_container {
  position: relative;
  cursor: pointer;
  display: flex;
  width: clamp(300px, 33.3vw, 640px);
  height: max-content;
  align-items: center;
  justify-content: space-between;
  background-color: var(--markdown-background);
  border: 1px solid var(--white-06);
  padding: 8px 12px;
  border-radius: 8px;
}
.link_container:hover .remove-button,
.link_container:hover .rect_hover_link {
  opacity: 1;
  transition: all 200ms ease-in-out;
}
.left_part {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}
.text_grup {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.text_grup span {
  color: var(--text-f4);
  font-size: 13px;
  font-family: 'SF Pro Medium';
}

.text_grup input {
  background-color: var(--markdown-background);
  font-family: 'SF Pro Medium';
  color: var(--text-a1);
  font-size: 13px;
  border: none;
  height: max-content;
  width: 100%;
}
.text_grup input:focus {
  outline: none;
}
</style>
