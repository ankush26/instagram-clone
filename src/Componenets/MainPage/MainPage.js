import React from 'react'
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";

export default function MainPage() {
    return (
        <div>
            <div className="mainpage__container">
                <div className="mainpage__divider"></div>
                <div className="fileupload">
                    <label for="file-upload" >
                        <img className="mainpage__uploadicon" src={uploadImage} />
                    </label>
                    <input id="file-upload" type="file" />
                </div>
                <div className="mainpage__divider"></div>
            </div>
            <div className="upload_text"></div>

            <Post id='' userName='' postImage='' likes='11' />

        </div>
    )
}
