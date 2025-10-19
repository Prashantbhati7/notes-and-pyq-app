import { createContext,useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut, GoogleAuthProvider , signInWithPopup} from "firebase/auth";
const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
export const useFirebase = ()=>  useContext(FirebaseContext);
console.log("${import.meta.env.FIREBASE_API_KEY} is ",import.meta.env.FIREBASE_AUTH_DOMAIN) 
const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const FirebaseProvider = (props) =>{
    const [user ,setuser] = useState(null);
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
        console.log(user);
        setuser(user || null);
      })
      return () => unsubscribe();
    },[auth])
    const signUpWithUsernameAndPass = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInWithEmailAndPass = async(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password);
    } 
   const logout = () =>{
     return signOut(auth);
   }
   const googlelogin = () =>{
     return signInWithPopup(auth,provider);
   }
    const isloggedin = user?true:false;
    return <FirebaseContext.Provider value={{signUpWithUsernameAndPass,signInWithEmailAndPass,isloggedin,logout,googlelogin}}>{props.children}</FirebaseContext.Provider>
};