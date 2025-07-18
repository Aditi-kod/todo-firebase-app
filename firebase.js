import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxy7RI_uXDPL3BJJI8zLHA3X15sZyRNQ0",
  authDomain: "to-do-app-6f2d8.firebaseapp.com",
  projectId: "to-do-app-6f2d8",
 storageBucket: "to-do-app-6f2d8.appspot.com", 
 messagingSenderId: "372457710810",
  appId: "1:372457710810:web:c1dde83368005e882df1e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
