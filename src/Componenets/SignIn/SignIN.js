import React, { useState } from 'react';
import "../LoginPage/LoginPage.css";

export default function SignIN() {
    const [state, setState] = useState({
        emailId : null,
        password: null
    })

    const login=()=>{
        // localStorage.setItem("users","admin");
        // window.location.reload();
        // auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         localStorage.setItem("users",JSON.stringify(user));
        //         window.location.reload();
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //     });
    }

    return (
        <div>
             <input className="logipage__text" onChange={(event)=>{state.emailId=event.currentTarget.value}} type="text" placeholder="Phone number, username, or email" />
             <input className="logipage__text" onChange={(event)=>{state.password=event.currentTarget.value}}  type="password" placeholder="Password" />
             <button className="login__button" onClick={login}>Log In</button>
        </div> 
    )
}
