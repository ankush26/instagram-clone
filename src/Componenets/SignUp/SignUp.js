import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';

export default function SignUp() {
    const initialData = {
        email: '',
        fullname: '',
        username: '',
        password: '',
    }
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
       
    }
    return (
        <div>
            <input name='email' className="logipage__text" type="text" placeholder="Mobile number or Email" onChange={handleChange}/>
            <input name='fullname' className="logipage__text" type="text" placeholder="Full Name" onChange={handleChange}/>
            <input name='username' className="logipage__text" type="text" placeholder="Username" onChange={handleChange}/>
            <input name='password' className="logipage__text" type="password" placeholder="Password" onChange={handleChange}/>
            <button className="login__button" >Sign up</button>
        </div>
    )
}
