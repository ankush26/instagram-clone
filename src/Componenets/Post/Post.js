import React, { useEffect, useState } from 'react'
import "./Post.css";
import { Avatar, Modal } from '@material-ui/core';
import postimage from "../../images/post.jpg";
import love from "../../images/love.svg";
import PostModal from "../../Componenets/PostModal/PostModal";
import commentIcon from "../../images/comment.svg";
import share from "../../images/share.svg";
import likelove from "../../images/likelove.png";
import app from '../../firebase';
import { getFirestore, collection, query, where, onSnapshot, orderBy, getDocs, addDoc, setDoc, doc, } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

export default function Post(props) {
    const { userdata } = useUser();
    const { currentUser } = useAuth();
    const db = getFirestore(app)
    const [comment, setComment] = useState("");
    const [postComments, setPostComments] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [totalLike, setTotalLike] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [showPost, setShowPost] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts/" + props.id + "/comments"), orderBy("timeStamp", "desc")),
            (snapshot) => {
                // snapshot.docs.map((doc) => ( setPostArray([...postArray, doc.data()]) ))
                setPostComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            },
            (error) => {

            });
        return unsubscribe;

    }, [props]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts/" + props.id + "/likes"), where("id", "==", currentUser.uid)),
            (snapshot) => {
                setIsLike(snapshot.size > 0)
            },
            (error) => {
            });
        onSnapshot(
            query(collection(db, "posts/" + props.id + "/likes")),
            (snapshot) => {
                setTotalLike(snapshot.size)
            },
            (error) => {
            });
        return unsubscribe;

    }, [props]);



    const handleLike = async (e) => {
        e.preventDefault();
        if (isLike) return;
        try {
            await addDoc(collection(db, 'posts/' + props.id + '/likes'), {
                "id": currentUser.uid,
            });
            setIsLike(true)
        } catch (error) {
            console.log(error);
        }
    }

    const sumbitComment = async (e) => {
        e.preventDefault();
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
    }
    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header">
                <Avatar className="post__image" src="" />
                <div className="post__username">{props.userName}</div>
            </div>

            {/* Image */}
            <div onDoubleClick={handleLike} onMouseDown={() => setShowPost(true)}>
                <img src={props.postImage} width="615px" />
            </div>

            {/* Analytics */}
            <div>
                <div style={{ "marginLeft": "10px" }}>
                    <img src={isLike ? likelove : love} className="post_reactimage" onClick={handleLike} />
                    <img src={commentIcon} className="post_reactimage" onClick={() => setIsModal(true)} />
                    <img src={share} className="post_reactimage" />
                </div>
                <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                    {totalLike} likes
                </div>
            </div>

            {/* Comment Section */}
            <div>
                {postComments[0] && <div className="suggestions__friends" style={{ "margin": '10px' }}>
                    <Avatar src='' className="suggestions__image" />
                    <div className="suggestions__username">{postComments[0]?.username}</div>
                    <div className="post_comment">{postComments[0]?.comment}</div> <span></span>
                </div>}
                <form onSubmit={sumbitComment}>
                    <input text="text" className="post__commentbox" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." />
                </form>
            </div>
            {isModal && (
                <PostModal postComments={postComments} postImage={props.postImage} postUsername={props.userName} isModal={isModal} setIsModal={setIsModal} />
            )}

            {showPost && (
                <Modal open={showPost} onMouseUp={() => setShowPost(false)}>
                    <div className="post_modal__body"><img src={props.postImage} width="90%" /></div>
                </Modal>
            )}
        </div>
    )
}
