import React, { useState } from "react"
import { uploadImage } from "../util/firebaseFunctions"
import axios from 'axios';

export default function Profile() {
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
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
            <img src={imageUrl} alt='pic' />
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleImage} />
                <button>Upload</button>

            </form>

        </div>


    )
}