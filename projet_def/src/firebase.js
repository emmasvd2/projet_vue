// Importation des modules Firebase nécessaires
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Vérifie si Firebase est déjà initialisé avant de le réinitialiser
const firebaseConfig = {
  apiKey: "AIzaSyDNEALUQQkQW1s13w0G0bslB7kHXmCHWt0",
  authDomain: "vuemovie.firebaseapp.com",
  projectId: "vuemovie",
  storageBucket: "vuemovie.appspot.com", // 
  messagingSenderId: "732018365202",
  appId: "1:732018365202:web:4714c8c4afe40eb40d59cb",
  measurementId: "G-LBEE25XTXX"
};

// Initialise Firebase uniquement s'il n'a pas été initialisé
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
