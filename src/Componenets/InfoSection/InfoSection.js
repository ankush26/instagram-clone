import React, { useState } from 'react'
import "./InfoSection.css";
import { Avatar } from '@material-ui/core';
import imageSrc from "../../images/pp1.png"
import { useUser } from '../../contexts/UserContext';

export default function InfoSection() {
    const {userdata} = useUser();
    console.log("userDataIs", userdata);
    return (
        <div>
            <div className="info__container">
                <Avatar src={imageSrc} className="info__image"/>
                <div className="info_content">
                    <div className="info_username">{userdata.username}</div>
                    <div className="info_description"> Description</div>
                </div>
            </div>
        </div>
    )
}
