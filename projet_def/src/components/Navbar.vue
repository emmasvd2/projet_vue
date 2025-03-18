<template>
  <nav class="navbar">
    <router-link to="/" class="logo">🎬 VueMovies</router-link>

    <ul class="nav-links">
      <li v-if="user">
        <router-link to="/account" class="account-btn">👤 Mon compte</router-link>
        <button class="user-btn" @click="handleLogout">Déconnexion</button>
      </li>
      <li v-else>
        <button class="user-btn" @click="handleLogin">Se connecter</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Vérifie si l'utilisateur est connecté
    const user = computed(() => authStore.user);

    const handleLogin = () => {
      console.log("Redirection vers /signup...");
      router.push("/signup");
    };

    const handleLogout = async () => {
      console.log("Déconnexion...");
      await authStore.logout();
      router.push("/"); // Redirige vers la page d'accueil après déconnexion
    };

    return { user, handleLogin, handleLogout };
  }
};
</script>
  
  <style scoped>
  /* Barre de navigation */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2c3d4e;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Logo VueMovies */
  .logo {
    font-size: 22px;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
  
  /* Liste des liens */
  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
  }
  
  /* Bouton utilisateur */
  .user-btn {
    background-color: #42b883;
    border: none;
    color: white;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .user-btn:hover {
    background-color: #3b8070;
  }
  </style>
  