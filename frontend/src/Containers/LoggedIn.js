import React, { useContext, useState } from 'react'
import { AuthContext } from "../Provider/authContext"
import Home from "../components/Home"
import LandingPage from "../components/LandingPage"


export default function LoggedIn() {
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser);
    return (
        <>
            {currentUser ? <Home/> : <LandingPage/>}
        </>
    )
}