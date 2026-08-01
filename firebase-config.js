// ============================================================
// SetMandu — Firebase v10 Modular SDK Configuration
// Shared by index.html (public registration) and admin.html (admin panel)
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase, ref, set, get, update, remove, push,
  onValue, off, runTransaction, child, query, orderByChild, equalTo
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ---- Firebase project config ----
const firebaseConfig = {
  apiKey: "AIzaSyDUMMY_REPLACE_WITH_YOUR_REAL_WEB_API_KEY",
  authDomain: "setmandu-603f9.firebaseapp.com",
  databaseURL: "https://setmandu-603f9-default-rtdb.firebaseio.com",
  projectId: "setmandu-603f9",
  storageBucket: "setmandu-603f9.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// NOTE: apiKey / messagingSenderId / appId above are placeholders.
// Get the real values from Firebase Console > Project Settings > General > "Your apps" > SDK setup.
// The databaseURL, projectId and storageBucket you gave me are already filled in correctly.

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Keep anonymous sessions persistent across visits on the same browser
setPersistence(auth, browserLocalPersistence).catch(() => {});

export {
  app, db, storage, auth,
  ref, set, get, update, remove, push, onValue, off, runTransaction, child, query, orderByChild, equalTo,
  storageRef, uploadBytes, getDownloadURL, deleteObject,
  signInAnonymously, onAuthStateChanged
};

// ============================================================
// Shared helpers
// ============================================================

// Escape any string before injecting into innerHTML — prevents stored XSS
export function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Atomically generate the next sequential SetMandu ID: SM0001, SM0002, ...
// Uses a Realtime Database transaction on meta/lastUserId so two simultaneous
// registrations can never receive the same number.
export async function generateNextUserId() {
  const counterRef = ref(db, "meta/lastUserId");
  const result = await runTransaction(counterRef, (current) => (current || 0) + 1);
  const num = result.snapshot.val();
  return "SM" + String(num).padStart(4, "0");
}

// Upload a File object to Storage at a given path, return its download URL.
// Rejects files over 5MB and enforces image mime types for basic client-side safety.
export async function uploadImage(file, path) {
  if (!file) return null;
  if (!/^image\//.test(file.type)) throw new Error("invalid-file-type");
  if (file.size > 5 * 1024 * 1024) throw new Error("file-too-large");
  const fileRef = storageRef(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

// Human-readable Firebase error messages (bilingual)
export function friendlyFirebaseError(err, lang) {
  const code = (err && (err.code || err.message)) || "";
  const ne = {
    "permission-denied": "अनुमति अस्वीकृत भयो। कृपया पुनः प्रयास गर्नुहोस्।",
    "network-error": "नेटवर्क त्रुटि। इन्टरनेट जडान जाँच गर्नुहोस्।",
    "invalid-file-type": "कृपया मान्य तस्बिर फाइल छान्नुहोस्।",
    "file-too-large": "फाइल साइज ५ MB भन्दा कम हुनुपर्छ।",
    default: "केही समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।"
  };
  const en = {
    "permission-denied": "Permission denied. Please try again.",
    "network-error": "Network error. Please check your internet connection.",
    "invalid-file-type": "Please choose a valid image file.",
    "file-too-large": "File size must be under 5 MB.",
    default: "Something went wrong. Please try again."
  };
  const table = lang === "en" ? en : ne;
  for (const key in table) {
    if (code.toLowerCase().includes(key)) return table[key];
  }
  return table.default;
}

// Simple online/offline watcher
export function watchConnection(onChange) {
  window.addEventListener("online", () => onChange(true));
  window.addEventListener("offline", () => onChange(false));
  onChange(navigator.onLine);
}
