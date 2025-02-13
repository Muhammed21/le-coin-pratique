<template>
  <section class="menu_container">
    <div class="menu_primary_part">
      <div class="menu_primary_left_part">
        <img src="../../assets/profil/profile_muhammed.svg"/>
        <div class="selector">
          <span ref="profil_name">Muhammed Cavus</span>
          <img src="../../assets/svg/bottom_arrow.svg"/>
        </div>
      </div>
      <button @click="local_page_maker()">
        <img src="../../assets/svg/sheet-paper.svg"/>
      </button>
    </div>
    <div class="menu_secondary_part">
      <img src="../../assets/svg/search-icon.svg"/>
      <input placeholder="Rechercher" autocomplete="off"/>
    </div>
    <div class="menu_third_part">
      <span class="third_part_span">Mon coin pratique</span>
      <div class="QG_container">
        <img src="../../assets/svg/home-icon.svg"/>
        <span class="QG_span" ref="QG_span">QG de Muhammed Cavus</span>
      </div>
    </div>
    <button @click="local_page_maker()" class="mobile_btn">
      <img src="../../assets/svg/sheet-paper.svg"/>
    </button>
  </section>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {pageSelected} from '@/stores/menu/page_selected'

let click = 1

const profil_name = ref(null)
const QG_span = ref(null)

const page_local = pageSelected()

const trimSpan = () => {
  if (profil_name.value) {
    profil_name.value.textContent = profil_name.value.textContent.slice(0, 11) + ' ...'
  }
  if (QG_span.value) {
    QG_span.value.textContent = QG_span.value.textContent.slice(0, 17) + ' ...'
  }
  if (window.innerWidth < 1000) {
    QG_span.value.textContent = QG_span.value.textContent.slice(0, 7) + ' ...'
  }
}

const local_page_maker = () => {
  const timestamp = Date.now();
  localStorage.setItem(
    `command_${click}`,
    JSON.stringify([
      {id: timestamp, content: "/"}
    ])
  );
  localStorageAnalysis();
};


const localStorageAnalysis = () => {
  const keys = Object.keys(localStorage);

  const commandKeys = keys.filter((key) => key.startsWith("command_"));

  const commands = commandKeys
    .map((key) => ({
      key,
      data: JSON.parse(localStorage.getItem(key)),
    }))
    .sort((a, b) => a.data[0].id - b.data[0].id);

  click = commands.length
  click++

  console.log(click)

  console.log(`Nombre de commandes trouvées : ${commands.length}`);

  const menuContainer = document.querySelector(".menu_third_part");

  menuContainer.querySelectorAll(".pages").forEach((el) => el.remove());

  commands.forEach((command, index) => {
    const commandDiv = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");

    img.src = "/src/assets/svg/stripe-icon.svg";

    commandDiv.className = "pages";
    span.innerHTML = `${command.data[0].content || `Page n°${index + 1}`}`;

    commandDiv.addEventListener("click", () => {
      menuContainer.querySelectorAll(".pages").forEach((el) => el.classList.remove("active"));
      commandDiv.classList.add("active");
      console.log(index + 1);
      console.log((page_local.page_no = index + 1));
      console.log(page_local.page_no);
    });

    if (index === 0) {
      commandDiv.classList.add("active");
      console.log(`Première commande activée : Page n°${index + 1}`);
    }

    commandDiv.appendChild(img);
    commandDiv.appendChild(span);
    menuContainer?.appendChild(commandDiv);
  });
};

onMounted(() => {
  localStorageAnalysis()
  trimSpan()
})
</script>

<style scoped>
.menu_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: fixed;
  background-color: var(--menu-background);
  border-right: 1px solid var(--white-05);
  top: 0;
  left: 0;
  height: 100vh;
  padding: 8px;
  max-width: 240px;
  width: 100%;
}

.selector {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: start;
  width: max-content;
}

span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

button {
  cursor: pointer;
  width: 25px;
  height: 25px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

button:hover {
  background-color: var(--white-05);
  border-radius: 5px;
}

.menu_primary_part {
  display: flex;
  width: 100%;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu_primary_left_part {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.menu_secondary_part {
  display: flex;
  width: 100%;
  height: max-content;
  padding: 5px 8px;
  border-radius: 6px;
  background-color: var(--white-05);
}

.menu_third_part {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.third_part_span {
  padding: 8px;
  color: #9b9b9b;
  font-size: 12px;
  font-family: 'SF Pro Regular';
  width: 100%;
}

.QG_container {
  display: flex;
  gap: 8px;
  padding: 8px;
  align-items: center;
  transition: all 200ms ease-in-out;
  justify-content: start;
  width: 100%;
}

.QG_container:hover {
  opacity: 80%;
  cursor: pointer;
  border-radius: 6px;
  transition: all 200ms ease-in-out;
}

.QG_span {
  font-size: 14px;
  font-family: 'SF Pro Medium';
  color: var(--white-50);
}

.mobile_btn {
  display: none;
}

input {
  padding-left: 5px;
  font-family: 'SF Pro Regular';
  color: #9b9b9b;
  background-color: transparent;
  border: none;
  width: 100%;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: #9b9b9b;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .menu_container {
    background-color: transparent;
    max-width: 100%;
    height: max-content;
    border-bottom: 1px solid var(--white-05);
    border-right: 0;
  }
  .menu_primary_part {
    display: none;
  }
  .menu_secondary_part {
    display: none;
  }
  .menu_third_part {
    flex-direction: row;
    gap: 10px;
    justify-content: start;
    width: 100%;
  }
  .third_part_span {
    display: none;
  }
  .mobile_btn {
    display: flex;
    position: fixed;
    bottom: 20px;
    right: 20px;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 99px;
    background-color: var(--white-05);
  }

  .mobile_btn:hover {
    border-radius: 99px;
    background-color: var(--white-10);
  }

  .mobile_btn img {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 800px) {
  .QG_container {
    display: none;
  }
}
</style>
