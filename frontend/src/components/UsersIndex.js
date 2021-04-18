import React, {useState, useEffect} from "react";
import axios from "axios";
import {apiUrl} from '../util/util'

export default function UsersIndex(){
    const [users, setUsers] = useState([]);
    const API = apiUrl();

    useEffect(() =>{
        const getAllUsers = async () =>{
            let res = await axios({
                method: 'get',
                url:`${API}/api/users`
            })
            setUsers(res.data.users);
        }
        getAllUsers();
    },[])
    return(
        <div>
            <h1>All Users. You are seeing this if logged in</h1>
            <ul>
                {users.map(user =>{
                    return <li key ={user.id}>{user.email}</li>
                })}
            </ul>
        </div>
    )


}