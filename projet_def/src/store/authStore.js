import { defineStore } from "pinia";
import { auth } from "@/firebase"; 
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { ref, onMounted } from "vue"; 

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const errorMessage = ref(""); // Stocke les erreurs pour le front

  // Vérifie l'état de l'utilisateur
  const checkAuthState = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        console.log("🔄 Mise à jour de l'utilisateur :", currentUser);
        user.value = currentUser;
        resolve(currentUser);
      });
    });
  };

  // Exécute checkAuthState au montage
  onMounted(() => {
    checkAuthState();
  });

  // Inscription avec validation stricte
  const signup = async (email, password) => {
    errorMessage.value = "";

    if (!email || !password) {
      errorMessage.value = "Veuillez remplir tous les champs.";
      console.warn("⚠ Champs vides !");
      return false;
    }

    if (!email.includes("@") || password.length < 6) {
      errorMessage.value = "Email invalide ou mot de passe trop court !";
      console.warn("⚠ Email ou mot de passe invalide !");
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (!userCredential.user) {
        throw new Error("Inscription échouée !");
      }

      console.log("✅ Inscription réussie :", userCredential.user);

      // Attendre que Firebase mette à jour l'état utilisateur
      await checkAuthState();

      console.log("📌 Utilisateur mis à jour après inscription :", user.value);

      if (!user.value) {
        errorMessage.value = "Problème avec l'authentification.";
        console.error("❌ Problème de mise à jour de l'utilisateur !");
        return false;
      }

      return true; // ✅ Inscription réussie
    } catch (error) {
      console.error("❌ Erreur d'inscription :", error);
      errorMessage.value = getErrorMessage(error.code);
      return false; // ❌ Empêche la redirection si l'inscription échoue
    }
  };

  // Connexion avec validation stricte
  const login = async (email, password) => {
    errorMessage.value = "";

    if (!email || !password) {
      errorMessage.value = "Veuillez remplir tous les champs.";
      console.warn("⚠ Champs vides !");
      return false;
    }

    if (!email.includes("@") || password.length < 6) {
      errorMessage.value = "Email invalide ou mot de passe trop court !";
      console.warn("⚠ Email ou mot de passe invalide !");
      return false;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user) {
        throw new Error("Authentification échouée !");
      }

      console.log("✅ Connexion réussie :", userCredential.user);

      // Attendre que Firebase mette à jour l'état utilisateur
      await checkAuthState();

      console.log("📌 Utilisateur mis à jour après connexion :", user.value);

      if (!user.value) {
        errorMessage.value = "Problème avec l'authentification.";
        console.error("❌ Problème de mise à jour de l'utilisateur !");
        return false;
      }

      return true; // ✅ Connexion réussie
    } catch (error) {
      console.error("❌ Erreur de connexion :", error);
      errorMessage.value = getErrorMessage(error.code);
      return false; // ❌ Empêche la redirection si l'authentification échoue
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      console.log("✅ Déconnexion réussie !");
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error);
    }
  };

  // Gestion des erreurs Firebase
  const getErrorMessage = (code) => {
    const errors = {
      "auth/email-already-in-use": "Cet email est déjà utilisé.",
      "auth/invalid-email": "Adresse email invalide.",
      "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
      "auth/user-not-found": "Aucun compte trouvé avec cet email.",
      "auth/wrong-password": "Mot de passe incorrect.",
      "auth/network-request-failed": "Problème de connexion. Vérifiez votre réseau.",
    };
    return errors[code] || "Une erreur est survenue. Veuillez réessayer.";
  };

  return { user, errorMessage, checkAuthState, signup, login, logout };
});
