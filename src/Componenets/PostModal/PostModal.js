import React from 'react'
import "./PostModal.css";
import { Avatar, Modal } from "@material-ui/core";

export default function PostModal({ postComments, postImage, isModal, setIsModal, postUsername }) {
    return (
        <Modal open={isModal} onClose={() => setIsModal(false)}>
            <div className="post_modal__body">
                <div className="post_modal__content">
                    <a
                        href="#!"
                        className="post_modal__close"
                        onClick={() => setIsModal(false)}
                    >
                        &times;
                    </a>
                    <div className="post__img">
                        <img src={postImage} alt="Post" />
                    </div>
                    <div className="post__body">
                        <div className="post__user">
                            <Avatar src='' alt='avtar' />
                            <h3>{postUsername}</h3>
                        </div>
                        <p className="post__caption"></p>
                        <h3 className="post__commentsHeading">Comments</h3>
                        <div className="post__comments">
                            {postComments.map((comment) => (
                                <div className="suggestions__friends" style={{ "margin": '10px' }}>
                                    <Avatar src='' className="suggestions__image" />
                                    <div className="suggestions__username">{comment.username}</div>
                                    <div className="post_comment">{comment.comment}</div> <span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
