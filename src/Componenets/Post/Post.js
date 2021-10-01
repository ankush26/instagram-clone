import React from 'react'
import "./Post.css";
import { Avatar } from '@material-ui/core';
import postimage from "../../images/post.jpg";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";

export default function Post() {
    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header">
                <Avatar className="post__image" src="" />
                <div className="post__username">ankush</div>
            </div>

            {/* Image */}
            <div>
                <img src={postimage} width="615px" />
            </div>

            {/* Analytics */}
            <div>
                <div style={{ "marginLeft": "10px" }}>
                    <img src={love} className="post_reactimage" />
                    <img src={comment} className="post_reactimage" />
                    <img src={share} className="post_reactimage" />
                </div>
                <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                    45 likes
                </div>
            </div>

            {/* Comment Section */}
            <div>

                <div className="post_comment">ankush: Rohit pagal h</div> : <span></span>

                <input text="text" className="post__commentbox" placeholder="Add a comment..." />
            </div>

        </div>
    )
}
