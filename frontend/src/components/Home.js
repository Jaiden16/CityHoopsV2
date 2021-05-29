import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../Provider/authContext"
import axios from "axios"
import { apiUrl } from "../util/util"

export default function Home() {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState("")
    const API = apiUrl();

    const getUser = async (user) => {
        if (user) {
            
            
            try {
                let res = await axios.get(`${API}/api/users/${user}`)
                let username = res.data.user.username
                setUser(username)

            } catch (err) {
                console.log(err)
            }

        }


    }

    useEffect(() => {
        if (currentUser) {
            // setUser(currentUser.email)
            getUser(currentUser.email);
        } else {
            setUser("No User")
        }

    }, [])



    return (
        <div>
            <h1>City HoopZ HomePage</h1>
            {user}
        </div>

    )
}