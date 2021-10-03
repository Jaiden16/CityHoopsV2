import React, { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../Provider/authContext";
import { uploadImage } from "../util/firebaseFunctions";
import { tableHeaders } from "../util/tableData"
import axios from 'axios';
import { apiUrl } from "../util/util";
import "../Css/Profile.css";
import TableBody from "../components/TableBody";
import ListBody from "../components/ListBody";
// import pic from "../pictures/logo.png"


export default function Profile() {
    const [image, setImage] = useState("");
    // const [imageUrl, setImageUrl] = useState("../../pictures/logo.png");
    const [imageUrl, setImageUrl] = useState("");
    const [skills, setSkills] = useState("")
    // let skillsLabel = Object.keys(skills)
    // let skillsValue = Object.values(skills)

    // console.log("initial skills", skills)
    // console.log("skills Label", skillsLabel)
    // console.log("skills Value", skillsValue)

    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    const email = currentUser.email
    const [id, setId] = useState("")

    const [descText, setDescText] = useState("")

    const [edit, setEdit] = useState(false)
    const textArea = useRef(null)

    const API = apiUrl();


    // console.log("profile page: ", email)

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log("small change")
        }
    }

    const descriptUpdate = () => {
        console.log(textArea)
        setDescText(textArea.current.value)
        setEdit(!edit)
        //todo
        //post/patch to users database
        //update/set current decription
        //hide text area

    }
    const editBox = () => {
        setEdit(!edit)
    }

    const fetchSkills = async (email) => {
        if (email) {
            try {
                let res = await axios.get(`${API}/api/users/${email}`)
                // console.log(res.data.user.usernum)
                let usernum = res.data.user.usernum
                // console.log("user num ", usernum)
                let res2 = await axios.get(`${API}/api/skills/${usernum}`)
                // console.log(res2.data.user)
                setSkills(res2.data.user)

            } catch (err) {
                console.log(err)
            }
        }

    }

    const fetchPhotoUrl = async (email) => {
        if (email) {
            try {
                let res = await axios.get(`${API}/api/users/photo/${email}`)
                let url = res.data.url.profile_url
                console.log(res.data.url.profile_url)
                setImageUrl(url)

            } catch (err) {

            }

        }
    }



    // useEffect(() => {

    // }, [])





    useEffect(() => {
        fetchSkills(email)
        fetchPhotoUrl(email)

    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = await uploadImage(image);
            console.log("photo url: ",url)
            setImageUrl(url);
            let post = await axios.patch(`${API}/api/users/photo/${email}`,{url})
            console.log("posting", post)
            //todo patch user date for picture

        } catch (err) {
            console.log("something went wrong")

        }
    }


    /*if(skills){
        // console.log("skills conditional",skills)
        // console.log("skills ", typeof(skills))
        // console.log("skills ", Object.keys(skills))
    }*/



    return (
        <div>
            <h1>MyProfile</h1>
            {/* {imageUrl ? <img className="Profile_img" src={imageUrl} alt='pic' /> : null} */}
            <div className="Profile_img">
                <img className="Image" src={imageUrl} alt='pic' />
            </div>

            <div className="Player_description">
                <p className="describe">{descText ? descText : "Describe your Game"}</p>
                <button onClick={editBox}>Edit Description</button>

                {edit ?
                    <>
                        <textarea ref={textArea} type="textarea"></textarea>
                        <button onClick={descriptUpdate}>Submit</button>
                    </> : null
                }
            </div>

            <div className="player_stats">
                <table>
                    {/* items that belong in the table head */}
                    <thead>
                        <tr>
                            {tableHeaders.map((item, index) => {
                                // console.log("index",Object.keys(item)[index])
                                return (
                                    <th key={index}
                                        align={item.align}
                                        scope={item.scope}
                                    >
                                        {/* {Object.keys(item)[index]} */}
                                        {/* {Object.values(item)[index]} */}
                                        {item.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {skills? <TableBody skills={skills}/> : null} */}
                        <TableBody skills={skills} />


                    </tbody>
                </table>

                {/* <div>

                        <ListBody skills = {skills}/>
                </div> */}






            </div>


            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleImage} />
                <button>Upload</button>
            </form>


        </div>


    )
}