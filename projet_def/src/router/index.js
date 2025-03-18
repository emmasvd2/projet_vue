import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/authStore"; // Vérifie le bon chemin
import Home from "@/views/Home.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import Signup from "@/views/Signup.vue";
import Protected from "@/views/Protected.vue"; // Page protégée

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail, props: true },
  { path: "/signup", name: "Signup", component: Signup },
  {
    path: "/protected",
    name: "Protected",
    component: Protected,
    meta: { requiresAuth: true }, // Page protégée
  },
  { 
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"), // Import dynamique
    meta: { requiresAuth: true }, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérification de l'authentification avant d'accéder aux pages protégées
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuthState(); // Assure-toi que l'état de l'utilisateur est à jour

  if (to.meta.requiresAuth && !authStore.user) {
    console.warn("Accès refusé : Redirection vers /protected");
    next("/protected"); // Redirige si non connecté
  } else {
    next(); // Accès autorisé
  }
});

export default router;
