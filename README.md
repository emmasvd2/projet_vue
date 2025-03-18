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
- **Ajout à la watchlist** : Possibilité d'ajouter des films à une liste "À regarder plus tard" (stockée en `localStorage`) seulement si l'utilisateur est connecté.
- **Authentification Firebase** :
- Inscription et connexion via Firebase Authentication.
- Gestion de l’état utilisateur avec Pinia.
- Protection des pages sensibles (`/account` et `/protected`).
- **Expérience utilisateur améliorée** :
- Interface fluide et moderne en Vue.js avec SCSS.
- Animation de confirmation lors de l'ajout à la watchlist.
- Filtrage des films par lettre pour une navigation plus rapide.
- **La Navbar** : Le logo sert de menu Home quand on clique dessus. De plus, il y a le bouton pour `se connecter`. Lorsque vous êtes connecté, vous avez le bouton `Mon compte` qui apparaît. Dessus vous y retrouvez votre mail, la liste de films à enregistrer plus tard et le bouton de deconnexion du compte.

## Difficultés rencontrées et solutions apportées

### 1️. **Problème d'importation de Firebase**

- **Erreur** : Une erreur revenait lors de la mise en place de firebase : "Export 'auth' is not defined in module".
- **Solution** : Il s'agissait d'une erreur d'inattention. J'ai alors vérifié et corrigé l'import dans `firebase.js` (`export { auth };`).

### 2️. **Affichage des films en double**

- **Erreur** : Lors de l'affichage des films, certaines lettres du filtre apparaissaient plusieurs fois en double.
- **Solution** : J'ai alors vérifié cela avec `if (!availableLetters.value.includes(letter))` avant d'ajouter une lettre.

### 3️. **Données non mises à jour en temps réel dans la watchlist**

- **Erreur** : Lors de la suppression d'un film, l'interface ne se mettait pas à jour immédiatement et l'on voyait encore le film qui était normalement supprimé de la liste.
- **Solution** : J'ai donc utilisé `computed()` et `watchEffect()` pour rendre les mises à jour réactives.

### 4️. **Redirection après déconnexion**

- **Erreur** : Après une déconnexion, l'utilisateur restait sur la page `/account` alors qu'il ne devait plus y avoir accès.
- **Solution** : Pour corriger cela, j'ai ajouté une redirection vers `/signup` après `authStore.logout()`.

## Installation et exécution

### Prérequis

- Node.js installé (`node -v` pour vérifier).

### Installation

1. **Dézipper le projet**
2. **Ouvrir le projet avec son IDE (VS Code par exemple)**
3. **Installer les dépendances**
   ```bash
   npm install pinia firebase axios vue3carousel
   ```
4. **Naviguer dans le dossier du projet**

```bash
cd projet_def
```

5. **Installer les dépedances du projet**

```bash
npm install
```

### Lancer l’application

```bash
npm run dev
```

### Accéder à l’application

Ouvrir http://localhost:5173 (ou autre port indiqué par Vite).

### Compte utilisateur de test

- identifiant : test@test.com
- mdp : test0000

## Améliorations possibles :

- Ajouter un backend pour stocker les watchlists en base de données.
- Ajout d’un mode sombre :
  Un toggle "Mode Sombre / Mode Clair" permet de basculer entre les deux. Stocker le mode en localStorage.
- Ajout de filtres avancés :
  - Filtre par genre (action, comédie...)
  - Filtre par année
  - Filtre par note IMDB
- Ajout d’une fonctionnalité "📌 Listes Personnalisées"

  - Ajout d’un onglet "📂 Mes listes" où l’utilisateur crée des catégories personnalisées.
    Exemple :

          - Films de Noël
          - Films d’action
          - Drames émouvants

<br>
<br>
Développé avec Vue.js, Pinia, Vue Router et Firebase par Emma Stievenard.
