import React, { useState } from 'react'

export default function SignUp() {
    const [state, setState] = useState({
        emailId: '',
        name: '',
        userName: '',
        password: ''
    })
    return (
        <div>
            <input className="logipage__text" type="text" placeholder="Mobile number or Email" />
            <input className="logipage__text" type="text" placeholder="Full Name" />
            <input className="logipage__text" type="text" placeholder="Username" />
            <input className="logipage__text" type="password" placeholder="Password" />
            <button className="login__button" >Sign up</button>
        </div>
    )
}
