import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom"

const auth = getAuth(app)
const db = getFirestore(app)
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const signup = ({ email, fullname, username, password }) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
            .then((new_user)=>{
                addDoc(collection(db, 'users'), {
                    uid: new_user.user.uid,
                    username,
                    fullname,
                    photoURL: '',
                })
                setCurrentUser(new_user.user)
            })
            .then(()=>{
                history.push("home")
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    function signin({email, password}) {
        signInWithEmailAndPassword(auth, email, password )
        .then((user)=>{
            setCurrentUser(user.user)
        })
        .then(()=>{
            history.push("home")
        })
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })

        console.log('user is :', currentUser);
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
