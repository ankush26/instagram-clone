import React, { useEffect, useState } from 'react'
import "./Post.css";
import { Avatar } from '@material-ui/core';
import postimage from "../../images/post.jpg";
import love from "../../images/love.svg";
import commentIcon from "../../images/comment.svg";
import share from "../../images/share.svg";
import app from '../../firebase';
import { getFirestore, collection, query, where, onSnapshot, orderBy, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

export default function Post(props) {
    const { userdata } = useUser();
    const { currentUser } = useAuth();
    const db = getFirestore(app)
    const [comment, setComment] = useState("");
    const [postComments, setPostComments] = useState([]);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts/" + props.id + "/comments"), orderBy("timeStamp", "desc")),
            (snapshot) => {
                // snapshot.docs.map((doc) => ( setPostArray([...postArray, doc.data()]) ))
                setPostComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            },
            (error) => {

            });
        console.log(postComments);
        return unsubscribe;

    }, [postComments]);

    const sumbitComment = async (e) => {
        e.preventDefault();
        console.log('comment enter');
        try {
            await addDoc(collection(db, 'posts/' + props.id + '/comments'), {
                comment,
                "timeStamp": new Date().getTime(),
                "username": userdata.username,
            });
            setComment('')
        } catch (error) {
            console.log(error);
        }
        console.log('comment exit');
    }
    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header">
                <Avatar className="post__image" src="" />
                <div className="post__username">{props.userName}</div>
            </div>

            {/* Image */}
            <div>
                <img src={props.postImage} width="615px" />
            </div>

            {/* Analytics */}
            <div>
                <div style={{ "marginLeft": "10px" }}>
                    <img src={love} className="post_reactimage" />
                    <img src={commentIcon} className="post_reactimage" />
                    <img src={share} className="post_reactimage" />
                </div>
                <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                    45 likes
                </div>
            </div>

            {/* Comment Section */}
            <div>
                <div className="suggestions__friends" style={{"margin":'10px'}}>
                    <Avatar src='' className="suggestions__image" />
                    <div className="suggestions__username">{postComments[0]?.username}</div>
                    <div className="post_comment">{postComments[0]?.comment}</div> <span></span>
                </div>
                <form onSubmit={sumbitComment}>
                    <input text="text" className="post__commentbox" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." />
                </form>
            </div>

        </div>
    )
}
