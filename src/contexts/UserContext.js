import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, query, where, onSnapshot, orderBy, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';

const db = getFirestore(app)
const storage = getStorage(app)
const UserContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const { currentUser } = useAuth();
    const [userdata, setUserdata] = useState();
    const [loading, setLoading] = useState(true)
    const [progressBar, setProgressBar] = useState('');
    const [postArray, setPostArray] = useState([]);

    useEffect(async () => {
        if (currentUser) {
            //get User Data
            const userquery = query(collection(db, "users"), where("uid", "==", currentUser.uid));
            const userquerySnapshot = await getDocs(userquery);
            userquerySnapshot.forEach((doc) => {
                setUserdata(doc.data())
            });
            console.log('userquery is', userdata);

            //get posts 
            const unsubscribe = onSnapshot(
                query(collection(db, "posts"), orderBy("timeStamp", "desc")),
                (snapshot) => {
                    // snapshot.docs.map((doc) => ( setPostArray([...postArray, doc.data()]) ))
                    setPostArray(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
                    console.log(postArray);
                },
                (error) => {
                    // ...
                });
            console.log(postArray);
        }
        setLoading(false)
    }, []);

    const upload = (e) => {
        let image = e.target.files[0];
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(Math.round(progress) + ' % Uploaded');
            },
            (error) => {

            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    try {
                        addDoc(collection(db, 'posts'), {
                            "userId": currentUser.uid,
                            "postPath": downloadURL,
                            "timeStamp": new Date().getTime(),
                            "username": userdata.username,
                        }).then((docRef) => {
                            setDoc(doc(db, 'posts', docRef.id), {
                                'id': docRef.id
                            }, { merge: true })
                        })

                    } catch (error) {
                        console.log(error);
                    }
                });
                setProgressBar('');
            }
        )
    }

    const value = {
        userdata,
        upload,
        progressBar,
        postArray
    }
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}
