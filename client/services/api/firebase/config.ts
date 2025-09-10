import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

/**
 * Configuration Firebase pour le test technique
 * 🔧 VERSION DEMO - Uniquement mode développement local
 */
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// 🔧 TOUJOURS en mode développement local (émulateurs)
const functions = getFunctions(app, 'us-central1');

// 🔧 TOUJOURS connecté aux émulateurs locaux
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFunctionsEmulator(functions, '127.0.0.1', 5001);

export { app, auth, functions }; 