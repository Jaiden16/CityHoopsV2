import React, { useContext, useState } from "react"
import { AuthContext } from "../Provider/authContext";
import { uploadImage } from "../util/firebaseFunctions";
import axios from 'axios';
import { apiUrl } from "../util/util";


export default function Profile() {
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const{currentUser} = useContext(AuthContext)
    console.log("profile page: ", currentUser)

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log("small change")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = await uploadImage(image);
            setImageUrl(url);
            //todo patch user date for picture

        } catch (err) {
            console.log("something went wrong")

        }



    }


    return (
        <div>
            <h1>MyProfile</h1>
            {imageUrl ? <img src={imageUrl} alt='pic' /> : null}
            
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleImage} />
                <button>Upload</button>
            </form>


        </div>


    )
}