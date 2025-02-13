<script>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <ul>
      <li>/code</li>
      <li>/link</li>
      <li># H1</li>
      <li>## H2</li>
      <li>### H3</li>
      <li>#### H4</li>
      <li>#... HX</li>
      <li>```bout de code```</li>
      <li>---</li>
      <li>- Liste à puce</li>
      <li>--------------------------------------------------------------------</li>
      <li>------- La majorité des commandes markdown sont acceptées -------</li>
      <li>--------------------------------------------------------------------</li>
    <RouterLink class="link" to="/">Accueil</RouterLink>
    </ul>
  </main>
</template>

<style scoped>
ul {
  background-color: var(--white-05);
  border: 1px solid var(--white-10);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.link {
  color: var(--white);
  text-decoration: underline;
}
</style>
