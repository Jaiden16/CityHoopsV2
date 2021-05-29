import React, { useContext } from "react"
import { NavLink } from 'react-router-dom'
import "../Css/NavBar.css"
import { logout } from "../util/firebaseFunctions"
import { AuthContext } from "../Provider/authContext"

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);

    const displayButtons = () => {
        if (currentUser) {
            return (
                <>
                <NavLink to={'/profile'}>My Profile</NavLink>
                <button onClick={logout}>LogOut</button>
                </>
            )
        } else {
            return (
                <>
                    <NavLink to={'/login'}>LogIn</NavLink>
                    <NavLink to={'/signup'}>SignUp</NavLink>
                </>
            )
        }
    }

    return (
        <nav>
            <NavLink exact to={'/'}>Home</NavLink>
            <NavLink to={'/users'}>Users</NavLink>
            {displayButtons()}
        </nav>
    )
};

