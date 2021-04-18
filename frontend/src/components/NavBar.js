import React from "react"
import {NavLink} from 'react-router-dom'
import "../Css/NavBar.css"

export default function NavBar(){
    return(
        <nav>
            <NavLink exact to ={'/'}>Home</NavLink>
            <NavLink to ={'/users'}>Users</NavLink>
            <NavLink to ={'/login'}>LogIn</NavLink>
            <NavLink to ={'/signup'}>SignUp</NavLink>
        </nav>
    )
};

