import React from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import statusimg from "../../images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import avatar from '../../images/defaultAvtar.png';

export default function StatusBar() {
    return (
        <div>
            <div className="statusbar__container">
                <div className="fileupload">
                    <label for="file-upload-status" >
                        <img className="statusbar__upload" src={uploadimage} width="55px" height="55px" />
                    </label>
                    <input id="file-upload-status" type="file" />
                </div>

                <div className="status">
                    <Avatar className="statusbar__status" src={avatar} />
                    <div className="statusbar__text">ankush</div>
                </div>
                <div className="status">
                    <Avatar className="statusbar__status" src={avatar} />
                    <div className="statusbar__text">rohit</div>
                </div>

            </div>
        </div>
    )
}
