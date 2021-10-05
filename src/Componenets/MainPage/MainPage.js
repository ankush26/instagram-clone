import React from 'react'
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";
import { useUser } from '../../contexts/UserContext';
export default function MainPage() {
    const { upload, progressBar, postArray } = useUser();
    return (
        <div>
            <div className="mainpage__container">
                <div className="mainpage__divider"></div>
                <div className="fileupload">
                    <label for="file-upload" >
                        <img className="mainpage__uploadicon" src={uploadImage} />
                    </label>
                    <input onChange={upload} id="file-upload" type="file" />
                </div>
                <div className="mainpage__divider"></div>
            </div>
            <div className="upload_text">{progressBar}</div>

            {
                 postArray.map((item) => (
                    <Post id={item.id} userName={item.username} postImage={item.postPath} likes='3' />
                ))
            }

        </div>
    )
}
