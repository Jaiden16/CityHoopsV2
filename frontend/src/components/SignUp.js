import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {apiUrl} from '../util/util'

export default function SignUp(){
    const [email,setEmail] = useState("");
    const [password,setPassWord] = useState("");
    const [error,setError] = useState(null);
    const history = useHistory();
    const API = apiUrl();

    const HandleSubmit = async(e) =>{
        e.preventDefault();
        try{
            //sign up with firebase and send results to backend
        history.push("/")

        }catch(err){
            setError(err.message)

        }
    }

    return(
        <>
            <h1>Sign Up Page</h1>
            {error ? <div>{error}</div> : null}
            <form onSubmit={HandleSubmit}>
                <input placeholder = "email" 
                value = {email}
                onChange = {(e) => setEmail(e.currentTarget.value)}
                />
                <input
                type = "Password" 
                placeholder = "password" 
                value = {password}
                onChange = {(e) => setPassWord(e.currentTarget.value)}
                autoComplete="on"
                />
                <button type = "submit">submit</button>
            </form>
        </>

    )
}