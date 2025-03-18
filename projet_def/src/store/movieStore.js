import { defineStore } from "pinia";
import { ref } from "vue";
import env from "@/env.js";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]); // Stocke la liste des films recherchés
  const selectedMovie = ref(null); // Stocke le film sélectionné
  const errorMessage = ref(""); // Ajout d'un message d'erreur pour le front

  // Recherche des films avec l'API OMDB
  async function fetchMovies(query) {
    if (!query.trim()) {
      errorMessage.value = "Veuillez entrer un titre de film.";
      movies.value = [];
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        movies.value = data.Search || [];
        errorMessage.value = ""; // Reset de l'erreur en cas de succès
      } else {
        movies.value = [];
        errorMessage.value = "Aucun film trouvé."; // Gestion des erreurs API
      }
    } catch (error) {
      console.error("Erreur API :", error);
      errorMessage.value = "Erreur lors de la récupération des films.";
    }
  }

  // Définir un film sélectionné
  function setSelectedMovie(movie) {
    selectedMovie.value = movie;
  }

  return { movies, selectedMovie, errorMessage, fetchMovies, setSelectedMovie };
});
