import React, { useState } from 'react';
import "../LoginPage/LoginPage.css";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom"

export default function SignIN() {
    const { signin } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const initialData = {
        email: '',
        password: '',
    }
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signin(data)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' className="logipage__text" onChange={handleChange} type="text" placeholder="Phone number, username, or email" />
                <input name='password' className="logipage__text" onChange={handleChange} type="password" placeholder="Password" />
                <input className="login__button" disabled={loading} type='submit' value='Login' />
            </form>
        </div>
    )
}
