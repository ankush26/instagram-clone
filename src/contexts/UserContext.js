import React, { useContext } from 'react'
import app from '../firebase';
import { getFirestore, collection } from "firebase/firestore";


const db = getFirestore(app)
const UserContext = React.createContext()

export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}) {

    const value={

    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
