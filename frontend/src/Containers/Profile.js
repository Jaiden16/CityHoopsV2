import React, { useContext, useState,useRef} from "react"
import { AuthContext } from "../Provider/authContext";
import { uploadImage } from "../util/firebaseFunctions";
import axios from 'axios';
import { apiUrl } from "../util/util";
import "../Css/Profile.css";
// import pic from "../pictures/logo.png"


export default function Profile() {
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("../../pictures/logo.png");
    const { currentUser } = useContext(AuthContext)
    const [descText,setDescText] = useState("")
    const textArea = useRef(null)
    console.log("profile page: ", currentUser)

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log("small change")
        }
    }

    const descriptUpdate = () => {
        console.log(textArea.current.value)
        setDescText(textArea.current.value)
        //todo
        //post/patch to users database
        //update/set current decription
        //hide text area

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
            {/* {imageUrl ? <img className="Profile_img" src={imageUrl} alt='pic' /> : null} */}
            <div className="Profile_img">
                <img className="Image"src={imageUrl} alt='pic' />
            </div>
            <div className="Player_description">
                <p className="describe">{descText? descText: "Describe your Game"}</p>
                <button>Edit Description</button>
                {/* todo if edit is true unhide text area  */}
                <textarea ref={textArea} type="textarea"></textarea>
                <button onClick={descriptUpdate}>Submit</button>

            </div>

            {/* <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleImage} />
                <button>Upload</button>
            </form> */}


        </div>


    )
}