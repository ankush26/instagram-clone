import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app)
const db = getFirestore(app)
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    const signup = ({ email, fullname, username, password }) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    setDoc(doc(db, 'users'), {
                        uid: result.user.uid,
                        username,
                        fullname,
                        photoURL: '',
                    })
                })
        } catch (error) {
            console.log(error.message);
        }
    }

    function signin(email, password) {
        return signInWithEmailAndPassword({email, password})
    }

    function logout() {
        return signOut()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
