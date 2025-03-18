<template>
  <div class="auth-container">
    <h2>{{ isLogin ? "Connexion" : "Inscription" }}</h2>

    <!-- Champs d'entrée pour l'email et le mot de passe -->
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Mot de passe" required />

    <!-- Message d'erreur affiché en cas de problème-->
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <!-- Bouton pour se connecter et s'inscrire -->
    <button @click="handleAuth">
      {{ isLogin ? "Se connecter" : "S'inscrire" }}
    </button>

    <!-- Lien pour basculer entre Connexion et Inscription -->
    <p @click="toggleAuthMode" class="toggle-link">
      {{ isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà inscrit ? Connectez-vous" }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    // Références réactives pour stocker les entrées utilisateur et les erreurs
    const email = ref(""); // Stocke l'email saisi
    const password = ref(""); // Stocke le mot de passe saisi
    const errorMessage = ref(""); // Stocke les messages d'erreur
    const isLogin = ref(true); // Indique si l'utilisateur est en mode Connexion ou Inscription
    const authStore = useAuthStore(); // Accède au store Pinia pour gérer l'authentification
    const router = useRouter(); // Utilisé pour naviguer après connexion/inscription

    // Gère la connexion et l'inscription
    const handleAuth = async () => {
    console.log(" Tentative d'authentification...");
    console.log(" Email saisi :", email.value);
    console.log(" Mot de passe saisi :", password.value);

    // Vérifie que le mot de passe contient au moins 6 caractères
    if (password.value.length < 6) {
      errorMessage.value = "Le mot de passe doit contenir au moins 6 caractères.";
      console.warn("⚠ Mot de passe trop court !");
      return;
    }

    let success;
    
    try {
      if (isLogin.value) {
        console.log(" Connexion en cours...");
        success = await authStore.login(email.value, password.value);
        if (success) {
          console.log("✅ Connexion réussie !");
          errorMessage.value = ""; // Efface le message d'erreur en cas de succès
        } else {
          errorMessage.value = authStore.errorMessage; // Met à jour le message d'erreur
        }
      } else {
        console.log(" Inscription en cours...");
        success = await authStore.signup(email.value, password.value);
        if (success) {
          console.log("✅ Inscription réussie !");
          errorMessage.value = ""; // Efface le message d'erreur en cas de succès
        } else {
          errorMessage.value = authStore.errorMessage; // Met à jour le message d'erreur
        }
      }

      // Bloque la redirection si l'authentification a échoué
      if (!success) {
        console.warn("🚫 Connexion/inscription échouée. Redirection annulée.");
        return;
      }

      router.push("/"); // ✅ Redirige UNIQUEMENT si la connexion a réussi
    } catch (error) {
      console.error("❌ Erreur inattendue :", error);
      errorMessage.value = "Une erreur s'est produite. Veuillez réessayer.";
    }
  };


    // Alterne entre mode Connexion et Inscription
    const toggleAuthMode = () => {
      isLogin.value = !isLogin.value; // Inverse le mode actuel
      errorMessage.value = ""; // Efface l'erreur si présente
      console.log(`Mode basculé : ${isLogin.value ? "Connexion" : "Inscription"}`);
    };

    return { email, password, errorMessage, isLogin, handleAuth, toggleAuthMode };
  }
};
</script>

<style scoped>
/* Conteneur principal */
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #2c3d4e;
  color: white;
  border-radius: 8px;
  text-align: center;
}

/* Champs d'entrée */
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
}

/* Bouton principal */
button {
  background-color: #42b883;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3b8070;
}

/* Lien pour basculer Connexion/Inscription */
.toggle-link {
  color: #42b883;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
}

/* Message d'erreur */
.error-msg {
  color: red;
  font-size: 14px;
}
</style>
