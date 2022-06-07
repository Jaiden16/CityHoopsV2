import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiUrl } from '../util/util';
import { AuthContext } from "../Provider/authContext";

export default function UsersIndex() {
    const [users, setUsers] = useState([]);
    const API = apiUrl();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getAllUsers = async () => {
            let res = await axios({
                method: 'get',
                url: `${API}/api/users`,
                headers: {
                    "AuthToken": token
                }
            })
            setUsers(res.data.users);
            console.log(res.data.users)
        }
        getAllUsers();
    }, [])
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => {
                    return <li key={user.id}>{user.username}</li>
                })}
            </ul>
        </div>
    )


}