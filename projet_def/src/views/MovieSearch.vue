<template>
  <div>
    <!-- Formulaire de recherche -->
    <form @submit.prevent="searchMovies" class="search-box">
      <input type="text" placeholder="Que recherchez-vous ?" v-model="search" />
      <input type="submit" value="Rechercher" />
    </form>

    <!-- Affichage des erreurs -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import env from "@/env.js";

export default {
  emits: ["movies-found"], // Émet l'événement pour renvoyer les résultats des films
  setup(props, { emit }) {
    const search = ref(""); // Stocke la saisie utilisateur
    const errorMessage = ref(""); // Stocke les messages d'erreur

    // 🔍 Recherche de films via l'API OMDB
    const searchMovies = async () => {
      errorMessage.value = ""; // Réinitialise les erreurs

      // Vérifie si l'utilisateur a entré un texte valide
      if (search.value.trim() === "") {
        errorMessage.value = "Veuillez entrer un titre de film.";
        console.warn(" Aucune recherche effectuée : champ vide.");
        return;
      }

      console.log(`Recherche de films pour : ${search.value}`);

      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`);
        const data = await response.json();

        if (data.Response === "True") {
          console.log("Films trouvés :", data.Search);
          emit("movies-found", data.Search); // Émet les films trouvés vers le composant parent
          errorMessage.value = "";
        } else {
          console.warn("Aucun film trouvé.");
          emit("movies-found", []);
          errorMessage.value = "Aucun film trouvé.";
        }
      } catch (error) {
        console.error("Erreur API :", error);
        errorMessage.value = "Erreur lors de la récupération des films.";
      }
    };


    return {
      search,
      searchMovies,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Style du message d'erreur */
.error {
  color: red;
  margin-top: 10px;
}
</style>
