import { defineStore } from "pinia";
import { ref } from "vue";

export const useWatchlistStore = defineStore("watchlist", () => {
  const watchlist = ref([]);

  // Charger la watchlist une seule fois au démarrage
  const loadWatchlist = () => {
    const savedList = localStorage.getItem("watchlist");
    watchlist.value = savedList ? JSON.parse(savedList) : [];
  };

  // Ajouter un film à la watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.value.some((m) => m.imdbID === movie.imdbID)) {
      watchlist.value.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist.value));
    }
  };

  // Supprimer un film de la watchlist et mettre à jour localStorage
  const removeFromWatchlist = (imdbID) => {
    watchlist.value = watchlist.value.filter((movie) => movie.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist.value));
  };

  // Exécuter `loadWatchlist()` une seule fois au chargement
  loadWatchlist();

  return { watchlist, addToWatchlist, removeFromWatchlist };
});
