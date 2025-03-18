<template>
  <div class="account">
    <h2>👤 Mon compte</h2>

    <!-- Infos utilisateur -->
    <div v-if="authStore.user" class="user-info">
      <p><strong>Email :</strong> {{ authStore.user.email }}</p>
      <button @click="logout" class="logout-btn"> Se déconnecter</button>
    </div>
    <p v-else class="not-logged-in">Vous n'êtes pas connecté.</p>

    <hr />

    <!-- Films à regarder plus tard -->
    <h2>🎬 Films à regarder plus tard</h2>

    <div v-if="watchlist.length > 0" class="movies-list">
      <div class="movie" v-for="movie in watchlist" :key="movie.imdbID">
        <div class="product-image">
          <img :src="movie.Poster" alt="Movie Poster" />
        </div>
        <div class="detail">
          <h3>{{ movie.Title }}</h3>
          <p class="year">{{ movie.Year }}</p>
          <button @click="removeMovie(movie.imdbID)" class="remove-btn">
            ❌ Supprimer
          </button>
        </div>
      </div>
    </div>

    <p v-else class="empty-list">Aucun film enregistré.</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useWatchlistStore } from "@/store/watchlistStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const watchlistStore = useWatchlistStore();
    const router = useRouter();

    // Déconnexion et rechargement pour éviter les incohérences
    const logout = () => {
      authStore.logout();
      window.location.reload(); // Recharge la page après déconnexion
    };

    // Supprime un film de la liste et force la mise à jour
    const removeMovie = (imdbID) => {
      console.log(`🗑 Suppression du film : ${imdbID}`);
      watchlistStore.removeFromWatchlist(imdbID);
      watchlistStore.loadWatchlist(); // Mise à jour immédiate de la liste
      console.log("📌 Nouvelle watchlist :", watchlistStore.watchlist);
    };

    return {
      authStore,
      watchlist: computed(() => watchlistStore.watchlist), // Mise à jour automatique
      removeMovie,
      logout,
    };
  }
};
</script>
  
  
  <style scoped>
  .account {
    text-align: center;
    color: white;
    max-width: 600px;
    margin: auto;
  }
  
  /* Infos utilisateur */
  .user-info {
    background-color: #2c3d4e;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .not-logged-in {
    color: #ffcc00;
    font-size: 18px;
  }
  
  /* Bouton de déconnexion */
  .logout-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.3s;
  }
  
  .logout-btn:hover {
    background-color: darkred;
  }
  
  /* Films enregistrés */
  .movies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .movie {
    background-color: #2c3d4e;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-image img {
    width: 100%;
    max-width: 200px;
    border-radius: 8px;
  }
  
  .detail {
    background-color: #496583;
    padding: 10px;
    border-radius: 8px;
  }
  
  .remove-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .remove-btn:hover {
    background-color: darkred;
  }
  
  .empty-list {
    color: #aaa;
    font-size: 18px;
  }
  </style>
  