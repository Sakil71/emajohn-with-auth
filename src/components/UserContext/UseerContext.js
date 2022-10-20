import React, { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/Firebase';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const auth = getAuth(app);

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();


// Main function/ Authtext Provider
const UseerContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign Up with google
    const signUpWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    // Sign Up: createUserWithEmailAndPassword
    const signUpWithEmailAndPassword = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in with email and password
    const signIN = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign Out
    const logOut = () =>{
        return signOut(auth);
    }

    // Auth State Change
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    },[])

    // Auth Info
    const authInfo = {user, signIN, signUpWithGoogle, signUpWithEmailAndPassword, logOut, loading};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseerContext;