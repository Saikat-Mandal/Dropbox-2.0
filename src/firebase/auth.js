import { auth  , googleProvider} from "./config"

import { createUserWithEmailAndPassword  , signInWithEmailAndPassword , signOut , signInWithPopup  } from "firebase/auth"

// sign up with email 
export const signUpWithEmailPassword = async(email, password) =>{
    let response = null,
    error = null;
   try {
    response = await createUserWithEmailAndPassword(auth , email, password)
   } catch (e) {
    error = e
   }
   return { response , error}
}

// sign in with email 
export const signInWithEmailPasswordFunction = async(email , password) =>{
    let response = null,
    error = null;
   try {
    response = await signInWithEmailAndPassword(auth, email, password)
   } catch (e) {
    error = e
   }
   return { response , error}
}

// sign in with google 
export const signInWithGoogle = async() => {
    let response = null,
    error = null;
    try {
        response = await  signInWithPopup(auth ,googleProvider)
    } catch (e) {
        error = e
    }
    return { response , error}
}


export const checkUserExists = ()=>{

      
}

// logout 
export const logout = async()=>{
    let response , error
    try {
       response = await signOut(auth)
    } catch (e) {
         error = e
    }

    return {response , error}
}
