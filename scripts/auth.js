const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');


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
signUpForm.addEventListener('submit', async (e) => {
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
    
    // M.toast({ html: "Account created successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    // M.toast({ html: `Signup failed: ${error.message}` });
  }
});

// Handle Login Form Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  try {
    // Set persistence first
    await setPersistence(auth, browserLocalPersistence);
    
    // Then sign in
    await signInWithEmailAndPassword(auth, email, password);
    // M.toast({ html: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    alert("err");
    // M.toast({ html: `Login failed: ${error.message}` });
  }
});
