import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../util/util'
import { signup } from "../util/firebaseFunctions"

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
    const API = apiUrl();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await signup(email, password);
            await axios.post(`${API}/api/users`, { id: res.user.uid, email, username })
            //sign up with firebase and send results to backend
            history.push("/")
            
        } catch (err) {
            setError(err.message)
            
        }
    }

    return (
        <>
            <h1>Sign Up Page</h1>
            {error ? <div>{error}</div> : null}
            <form onSubmit={HandleSubmit}>
                <input placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <input
                    type="Password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassWord(e.currentTarget.value)}
                    autoComplete="on"
                />
                <input
                    type="Text"
                    placeholder="userName"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    // autoComplete="on"
                />
                <button type="submit">submit</button>
            </form>
        </>

    )
}