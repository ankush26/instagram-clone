import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';

const db = getFirestore(app)
const UserContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const { currentUser } = useAuth();
    const [userdata, setUserdata] = useState();
    const [loading, setLoading] = useState(true)

    
    useEffect (async () => {
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserdata(doc.data())
        });
        console.log('ankush', currentUser.uid);
        setLoading(false)
    }, [])

    const value = {
        userdata,
    }
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}
