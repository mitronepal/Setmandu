
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAa66d3C-rJln3tJAtZQBKYTn1WZHk2K3c",
  authDomain: "setmandu-603f9.firebaseapp.com",
  databaseURL: "https://setmandu-603f9-default-rtdb.firebaseio.com",
  projectId: "setmandu-603f9",
  storageBucket: "setmandu-603f9.firebasestorage.app",
  messagingSenderId: "991608006279",
  appId: "1:991608006279:web:5ec362e9ae50a0dbff3a22",
  measurementId: "G-VP0G8T123X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Real Firebase Service
export const db = {
  saveUser: async (uid: string, data: any) => {
    console.log(`[Firebase] Saving user ${uid} to Realtime Database`);
    const userRef = ref(database, 'users/' + uid);
    return set(userRef, data);
  },
  getUsers: async () => {
    console.log(`[Firebase] Fetching all users`);
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    } else {
      return [];
    }
  },
  getMatches: async (gender: string) => {
    console.log(`[Firebase] Querying matches for gender: ${gender}`);
    const allUsers = await db.getUsers();
    return (allUsers as any[]).filter(u => u.gender === gender && u.verificationStatus === 'verified');
  }
};
