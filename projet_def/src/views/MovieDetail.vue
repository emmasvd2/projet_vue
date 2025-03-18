<template>
  <div class="movie-detail">
    <h2 v-if="movie">{{ movie.Title }}</h2>
    
    <div v-if="loading" class="loading">⏳ Chargement...</div>
    <div v-else-if="error" class="error">⚠️ {{ error }}</div>

    <div v-if="movie && !loading">
      <div class="movie-info">
        <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
        
        <div class="details">
          <p><strong>Année :</strong> {{ movie.Year }}</p>
          <p>{{ movie.Plot }}</p>

          <!-- Bouton "À regarder plus tard" -->
          <button v-if="authStore.user" @click="addToWatchlist" class="watchlist-btn">
            📌 {{ addedToWatchlist ? "Déjà ajouté !" : "À regarder plus tard" }}
          </button>
          <p v-else class="login-warning">⚠️ Connectez-vous pour ajouter des films à votre liste.</p>

          <!-- Animation de confirmation -->
          <p v-if="addedToWatchlist" class="confirmation">✅ Ajouté à la liste !</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWatchlistStore } from "@/store/watchlistStore";
import { useAuthStore } from "@/store/authStore";
import env from "@/env.js";

export default {
  setup() {
    const movie = ref(null);
    const route = useRoute();
    const watchlistStore = useWatchlistStore();
    const addedToWatchlist = ref(false); // État pour l'animation
    const loading = ref(true); // État de chargement
    const error = ref(""); // Stocke les erreurs API
    const authStore = useAuthStore();
    const router = useRouter();

    // Charge les détails du film
    onMounted(async () => {
      try {
        console.log("Chargement du film ID :", route.params.id);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
        );
        const data = await response.json();

        if (data.Response === "True") {
          movie.value = data;
          console.log("Film chargé :", movie.value);
        } else {
          throw new Error("Film introuvable !");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du film :", err);
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

   // Ajoute le film à la watchlist seulement si connecté
   const addToWatchlist = () => {
      if (!authStore.user) {
        console.warn("Ajout refusé : utilisateur non connecté !");
        router.push("/signup"); // Redirige vers la page de connexion
        return;
      }

      if (!addedToWatchlist.value) {
        console.log("Ajout à la watchlist :", movie.value.Title);
        watchlistStore.addToWatchlist(movie.value);
        addedToWatchlist.value = true;

      setTimeout(() => {
        addedToWatchlist.value = false;
      }, 2000);
    }
  };

    return {  movie, addToWatchlist, addedToWatchlist, loading, error, authStore };
  },
};
</script>

<style scoped>
.movie-detail {
  text-align: center;
  color: white;
  max-width: 600px;
  margin: auto;
}

/* Bouton "À regarder plus tard" */
.watchlist-btn {
  background-color: #42b883;
  border: none;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

.watchlist-btn:hover {
  background-color: #3b8070;
}

/* Animation de confirmation */
.confirmation {
  color: #42b883;
  font-weight: bold;
  margin-top: 10px;
  animation: fadeOut 2s ease-in-out;
}

/* Animation qui disparaît en fondu */
@keyframes fadeOut {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1); }
}

/* Mise en page */
.movie-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.featured-img {
  width: 200px;
  border-radius: 10px;
}

.details {
  background-color: #2c3d4e;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
}
</style>
