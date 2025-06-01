// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCryhTlC3iWCjjNlAFzqJbJoMGUXTPoyxo",
  authDomain: "evangelism-app-f36d8.firebaseapp.com",
  projectId: "evangelism-app-f36d8",
  storageBucket: "evangelism-app-f36d8.firebasestorage.app",
  messagingSenderId: "1095966569190",
  appId: "1:1095966569190:web:82ca3ebdab230b4f584127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth and firestore instances
const auth = getAuth(app);
const db = getFirestore(app);


// Handle Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('username').value;
  const phone = document.getElementById('signup-phone').value;
  const whatsapp = document.getElementById('signup-whatsapp').value;

  try {
    // Create user
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Store additional user data in Firestore
    const userDoc = doc(db, 'users', user.uid);
    await setDoc(userDoc, {
      name,
      phone,
      whatsapp,
      isAdmin: false,
      createdAt: new Date()
    });
    
    M.toast({ html: "Account created successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    M.toast({ html: `Signup failed: ${error.message}` });
  }
});

// Handle Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // Set persistence first
    await setPersistence(auth, browserLocalPersistence);
    
    // Then sign in
    await signInWithEmailAndPassword(auth, email, password);
    M.toast({ html: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    M.toast({ html: `Login failed: ${error.message}` });
  }
});


// UI control

// Toggle between signin/signup forms
function signIn() {
  document.querySelector('.signin-container').classList.remove('hidden');
  document.querySelector('.signup-container').classList.add('hidden');
}

function signUp() {
  document.querySelector('.signup-container').classList.remove('hidden');
  document.querySelector('.signin-container').classList.add('hidden');
}

// Unified auth listener
