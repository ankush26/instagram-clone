import React, { useState } from 'react';
import "../LoginPage/LoginPage.css";
import { useAuth } from '../../contexts/AuthContext';

export default function SignIN() {
    const initialData = {
        email: '',
        password: '',
    }
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
       console.log('login Click');
    }

    return (
        <div>
             <input name='email' className="logipage__text" onChange={handleChange} type="text" placeholder="Phone number, username, or email" />
             <input name='password' className="logipage__text" onChange={handleChange}  type="password" placeholder="Password" />
             <button className="login__button" onClick={handleSubmit}>Log In</button>
        </div> 
    )
}
