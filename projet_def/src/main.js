import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

try {
  const pinia = createPinia();
  app.use(pinia); // Enregistre Pinia avant le routeur
  app.use(router); // Ajoute ensuite le routeur
  app.mount("#app"); // Monte l'application
  console.log("Application Vue.js montée avec succès !");
} catch (error) {
  console.error("Erreur lors du montage de l'application :", error);
}
