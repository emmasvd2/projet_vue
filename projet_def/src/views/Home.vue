<template>
  <div class="home">
    <!-- Carrousel des films en vedette -->
    <Carousel v-if="featuredMovies.length" :items-to-show="3" :autoplay="3000" wrap-around>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>

      <Slide v-for="movie in featuredMovies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="carousel-item">
          <div class="product-image">
            <img :src="movie.Poster" :alt="movie.Title" class="featured-img" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <h3>{{ movie.Title }}</h3>
            <p class="year">{{ movie.Year }}</p>
          </div>
        </router-link>
      </Slide>
    </Carousel>

    <!-- Barre de recherche -->
    <MovieSearch @movies-found="updateMovies" />

    <!-- Filtre par lettre -->
    <div class="alphabet-filter">
  <button
    v-for="letter in availableLetters"
    :key="letter"
    :class="{ active: selectedLetter === letter }"
    @click="filterByLetter(letter)"
  >
    {{ letter }}
  </button>

  <!-- Bouton reset -->
  <button v-if="selectedLetter" class="reset-btn" @click="resetFilter">
    🔄 Réinitialiser
  </button>
</div>


    <!-- Liste des films -->
    <div class="movies-list">
      <div class="movie" v-for="movie in filteredMovies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import env from "@/env.js";
import MovieSearch from "@/views/MovieSearch.vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    MovieSearch,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    const movies = ref([]); // Tous les films récupérés
    const allMovies = ref({}); // Films classés par lettre
    const alphabet = ref("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    const featuredMovies = ref([]); // 🎞️ Les 5 films du carrousel
    const availableLetters = ref([]); // Lettres avec résultats
    const selectedLetter = ref(""); // Lettre sélectionnée

    // Réinitialise le filtre de lettre
    const resetFilter = () => {
      selectedLetter.value = "";
    };

    // Charger 5 films populaires pour le carrousel
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=marvel&type=movie`);
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
          featuredMovies.value = data.Search.slice(0, 5); // On prend les 5 premiers films
        }
      } catch (error) {
        console.error("Erreur API pour les films en vedette:", error);
      }
    };

    // Charger les 10 premiers films pour chaque lettre
    const fetchMoviesByLetter = async () => {
      const results = {};
      availableLetters.value = []; //Réinitialise la liste des lettres

      for (const letter of alphabet.value) {
        try {
          const response = await fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${letter} movie&type=movie`);
          const data = await response.json();

          console.log(`Réponse API pour ${letter}:`, data); // Vérifie la réponse de l'API

          if (data.Response === "True" && data.Search) { 
            results[letter] = data.Search.slice(0, 10); // On prend les 10 premiers résultats

            // Vérifie si la lettre est déjà dans la liste avant de l'ajouter
            if (!availableLetters.value.includes(letter)) {
                availableLetters.value.push(letter);
                console.log(`Lettre ajoutée : ${letter}`); // Log pour vérifier
              }

          } else {
            results[letter] = [];
          }
        } catch (error) {
          console.error(`Erreur API pour la lettre ${letter}:`, error);
        }
      }

      //  Mise à jour des films disponibles
      allMovies.value = { ...results }; // 
      movies.value = Object.values(results).flat();
    };

     // Exécute les fonctions au chargement
    onMounted(() => {
      fetchFeaturedMovies(); // Charge les films du carrousel
      fetchMoviesByLetter(); // Charge les films par lettre
    });

    onMounted(fetchMoviesByLetter);

    // Met à jour les films après une recherche
    const updateMovies = (newMovies) => {
      movies.value = newMovies;
    };

    // Filtrer les films par lettre sélectionnée
    const filterByLetter = (letter) => {
      selectedLetter.value = letter;
      console.log(`Filtrage par lettre : ${letter}`); // Log pour vérifier le filtrage
    };



    // Films filtrés par lettre sélectionnée
    const filteredMovies = computed(() => {
      if (!selectedLetter.value) {
        return movies.value; // Affiche tous les films par défaut
      }

      return (allMovies.value[selectedLetter.value] || []).filter(movie => movie.Title.startsWith(selectedLetter.value));
    });




    return {
      movies,
      featuredMovies,
      filteredMovies,
      alphabet,
      availableLetters,
      selectedLetter,
      filterByLetter,
      updateMovies,
      resetFilter,
    };
  },
};
</script>

<style lang="scss">

/* 🎞️ Carrousel */
.carousel {
  position: relative;
  max-width: 100%;
  margin: 20px auto;
  overflow: hidden;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #2c3d4e;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease-in-out;
}

.product-image {
  position: relative;
  display: block;
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 8px;
}

.featured-img {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.type {
  position: absolute;
  padding: 8px 16px;
  background-color: #42b883;
  color: #fff;
  bottom: 10px;
  left: 0px;
  text-transform: capitalize;
}

.detail {
  background-color: #496583;
  padding: 16px 8px;
  flex: 1 1 100%;
  border-radius: 0px 0px 8px 8px;
}

.detail h3 {
  color: #fff;
  font-weight: 600;
  font-size: 18px;
}

.detail .year {
  color: #aaa;
  font-size: 14px;
}

/* Filtre alphabétique */
.alphabet-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  gap: 5px;
}

.alphabet-filter button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.3s;
  opacity: 0.5; /* Lettres non sélectionnées sont plus transparentes */
}

.alphabet-filter button.active,
.alphabet-filter button:hover {
  background-color: #3b8070;
  opacity: 1;
}

/* Bouton reset */
.reset-btn {
  background-color: red;
  color: white;
  font-weight: bold;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.reset-btn:hover {
  background-color: darkred;
}

/* Liste des films */
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;
      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type='text'] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type='submit'] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    justify-content: center;
    padding: 20px;

    .movie {
      background-color: #2c3d4e;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            width: 100%;
            max-width: 250px;
            height: auto;
            border-radius: 8px;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aaa;
            font-size: 14px;
          }

          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}


/* Bouton reset */
.reset-btn {
  background-color: red;
  color: white;
  font-weight: bold;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.reset-btn:hover {
  background-color: darkred;
}

</style>

