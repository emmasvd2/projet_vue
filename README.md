# 🎬 VueMovies - Application de gestion de films

## Objectif du projet

VueMovies est une application web développée avec Vue.js et Pinia qui permet aux utilisateurs de :

- Rechercher des films via l'API OMDB, avec un filtre par lettres si souhaité.
- Ajouter des films à une liste "À regarder plus tard".
- Gérer l'authentification avec Firebase (inscription, connexion, déconnexion).
- Protéger certaines pages pour les utilisateurs authentifiés (ex: page de compte).
- Naviguer entre les films et les détails associés via Vue Router.

## Fonctionnalités principales

- **Recherche de films** : Recherche dynamique via l'API OMDB avec gestion des erreurs.
- **Carrousel de films populaires** : Affichage de films vedettes avec défilement automatique.
- **Ajout à la watchlist** : Possibilité d'ajouter des films à une liste "À regarder plus tard" (stockée en `localStorage`).
- **Authentification Firebase** :
- Inscription et connexion via Firebase Authentication.
- Gestion de l’état utilisateur avec Pinia.
- Protection des pages sensibles (`/account` et `/protected`).
- **Expérience utilisateur améliorée** :
- Interface fluide et moderne en Vue.js avec SCSS.
- Animation de confirmation lors de l'ajout à la watchlist.
- Filtrage des films par lettre pour une navigation plus rapide.

## Difficultés rencontrées et solutions apportées

### 1️. **Problème d'importation de Firebase**

- **Erreur** : "Export 'auth' is not defined in module".
- **Solution** : Vérification et correction de l'import dans `firebase.js` (`export { auth };`).

### 2️. **Affichage des films en double**

- **Erreur** : Lors de l'affichage des films, certaines lettres du filtre apparaissaient plusieurs fois.
- **Solution** : Vérification avec `if (!availableLetters.value.includes(letter))` avant d'ajouter une lettre.

### 3️. **Données non mises à jour en temps réel dans la watchlist**

- **Erreur** : Lors de la suppression d'un film, l'interface ne se mettait pas à jour immédiatement.
- **Solution** : Utilisation de `computed()` et de `watchEffect()` pour rendre les mises à jour réactives.

### 4️. **Redirection après déconnexion**

- **Erreur** : Après une déconnexion, l'utilisateur restait sur la page `/account` alors qu'il ne devait plus y avoir accès.
- **Solution** : Ajout d'une redirection vers `/signup` après `authStore.logout()`.

## Installation et exécution

### Prérequis

- Node.js installé (`node -v` pour vérifier).
- Un compte Firebase avec l’authentification email/mot de passe activée.

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/ton-projet/vue-movies.git
   cd vue-movies
   ```
2. **Installer les dépendances**

```bash

npm install
```

### Configurer Firebase

1. **Créer un fichier firebase.js avec ta configuration Firebase.**

2. **Activer l'authentification Firebase via email/mot de passe.**

### Lancer l’application

Démarrer le serveur de développement

```bash
npm run dev
```

### Accéder à l’application

Ouvrir http://localhost:5173 (ou autre port indiqué par Vite).

## Améliorations possibles :

- Ajouter un backend pour stocker les watchlists en base de données.
- Ajouter un mode sombre et une meilleure gestion des erreurs API.
- Tester l’application avec Jest pour améliorer la robustesse.

<br>
<br>
Développé avec Vue.js, Pinia, Vue Router et Firebase.
