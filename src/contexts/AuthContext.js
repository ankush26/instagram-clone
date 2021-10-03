import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(app)
const db = getFirestore(app)
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = async ({ email, fullname, username, password }) => {
        try {
            const new_user = await createUserWithEmailAndPassword(auth, email, password)
            await addDoc(collection(db, 'users'), {
                uid: new_user.user.uid,
                username,
                fullname,
                photoURL: '',
            })
            console.log(new_user);
        } catch (error) {
            console.log(error.message);
        }
    }

    function signin({email, password}) {
        return signInWithEmailAndPassword(auth, email, password )
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })

        console.log(currentUser);
        return unsubscribe();
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        logout,
    }
    console.log(currentUser);
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
