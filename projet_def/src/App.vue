<template>
  <div>
    <!-- 📌 Barre de navigation -->
    <Navbar />

    <!-- 🏠 Contenu principal (affichage des pages) -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue"; // 

export default defineComponent({
  name: "App",
  components: { Navbar },
});
</script>

<style lang="scss">
/* Styles globaux */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;

  &::selection {
    background: rgba(66, 184, 131, 0.5);
  }
}

body {
  background-color: #36495e;
}

main {
  display: block;
  text-align: left;
  padding: 20px;
  min-height: 80vh; /* ✅ Évite que le contenu soit trop collé en haut */
}


a {
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #fff;
  font-size: 28px;

  span {
    color: #42d883;
  }
}

.user-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Icône Mon Compte */
.account-btn {
  color: white;
  font-size: 16px;
  text-decoration: none;
  padding: 8px 16px;
  background-color: #42b883;
  border-radius: 5px;
  transition: 0.3s;
}

.account-btn:hover {
  background-color: #3b8070;
}

/* Bouton Déconnexion */
.user-btn {
  background-color: red;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.user-btn:hover {
  background-color: darkred;
}
</style>