import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function SignUp(){
    const [email,setEmail] = useState("");
    const [password,setPassWord] = useState("");
    const [error,setError] = useState(null);
    const history = useHistory();

    const HandleSubmit = async(e) =>{
        e.preventDefault();
        try{
            //sign in with firebase then change route
        history.push("/")

        }catch(err){
            setError(err.message)

        }
    }

    return(
        <>
            <h1>Login Page</h1>
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
                <button type = "submit">Login</button>
            </form>
        </>

    )
}