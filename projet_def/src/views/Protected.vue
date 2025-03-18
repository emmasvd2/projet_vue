<template>
  <div class="protected-page">
    <h1>🔒 Accès restreint</h1>
    <p>Cette page est accessible uniquement aux utilisateurs connectés.</p>
    
    <!-- Redirection vers l'inscription -->
    <router-link to="/signup" class="btn">Se connecter</router-link>
  </div>
</template>

<style scoped>
.protected-page {
  text-align: center;
  margin-top: 50px;
  color: white;
}

.btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s;
}

.btn:hover {
  background-color: #3b8070;
}
</style>
