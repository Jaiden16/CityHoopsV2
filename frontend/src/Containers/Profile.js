import React, { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../Provider/authContext";
import { uploadImage } from "../util/firebaseFunctions";
import axios from 'axios';
import { apiUrl } from "../util/util";
import "../Css/Profile.css";
import { CommunityStats } from "../util/mockData.js"
import PlayerStats from "../components/PlayerStats";
// import pic from "../pictures/logo.png"

/*Material UI Imported button code*/
import{styled} from "@mui/material/styles"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import Stack from "@mui/material/Stack"


const Input = styled('input')({
    display:'none'
})


export default function Profile() {
    const [image, setImage] = useState("");
    // const [imageUrl, setImageUrl] = useState("../../pictures/logo.png");
    const [imageUrl, setImageUrl] = useState("");
    const [playerStats, setPlayerStats] = useState({})
    const [communityStats, setCommunityStats] = useState(CommunityStats)
    const [username, setUsername] = useState("")

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
        // console.log(textArea)
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
                // console.log("fetch consolelog ", res.data.user.username)
                setUsername(res.data.user.username)
                let usernum = res.data.user.usernum
                // console.log("user num ", usernum)
                let res2 = await axios.get(`${API}/api/skills/${usernum}`)
                // console.log(res2.data.user)
                setPlayerStats(res2.data.user)

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
                // console.log(res.data.url.profile_url)
                setImageUrl(url)

            } catch (err) {

            }

        }
    }

    useEffect(() => {
        fetchSkills(email)
        fetchPhotoUrl(email)

    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = await uploadImage(image);
            // console.log("photo url: ",url)
            setImageUrl(url);
            let post = await axios.patch(`${API}/api/users/photo/${email}`, { url })
            // console.log("posting", post)
            //todo patch user date for picture

        } catch (err) {
            console.log("something went wrong")

        }
    }


    // console.log(currentUser)
    return (
        <div className="Profile_Container">
            {/* {imageUrl ? <img className="Profile_img" src={imageUrl} alt='pic' /> : null} */}

            <div className="player_info">
                <div className="profile_user_heading">{username}</div>
                <div className="Profile_img">
                    <img className="Image" src={imageUrl} alt='pic' />
                    <div>
                    <form onSubmit={handleSubmit}>
                        <input type='file' onChange={handleImage} />
                        <button>Upload</button>
                    </form>
                </div>
                    <label htmlFor='icon-button-file'>
                        <Input accept="image/*" id="icon-button-file" type="file"/>
                        <IconButton color="primary" aria-label="upload picture" component="div">
                            <PhotoCamera/>
                        </IconButton>

                    </label>
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

                

            </div>


            <div className="player_stats">
                <PlayerStats
                    communityStats={communityStats}
                    playerStats={playerStats} />
                {/*  */}


                {/* <table>
                    items that belong in the table head
                    <thead>
                        <tr>
                            {tableHeaders.map((item, index) => {
                                // console.log("index",Object.keys(item)[index])
                                return (
                                    <th key={index}
                                        align={item.align}
                                        scope={item.scope}
                                    >
                                        
                                        {item.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {skills? <TableBody skills={skills}/> : null}
                        <TableBody 
                        skills={playerStats} 
                        mock={communityStats}/>


                    </tbody>
                </table> */}

                {/* <div>

                        <ListBody skills = {skills}/>
                </div> */}






            </div>





        </div>


    )
}