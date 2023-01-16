import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyABJkQFSTmwew-MrcB_U53Pt8KqWSPeNbI",
    authDomain: "whatsapp-clone-jan-2023.firebaseapp.com",
    projectId: "whatsapp-clone-jan-2023",
    storageBucket: "whatsapp-clone-jan-2023.appspot.com",
    messagingSenderId: "189439696343",
    appId: "1:189439696343:web:a946761d7208a5723c7f92"
};
const FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);


