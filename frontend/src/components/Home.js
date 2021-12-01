import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../Provider/authContext"
import axios from "axios"
import { apiUrl } from "../util/util"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import mapStyles from "../mapstyles"
import "../Css/Home.css"
// import Key from "../secrets/secrets"
import parkData from "../data/DPR_Basketball_001.json"

const libraries = ["places"]



const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 40.826149,
    lng: -73.920273
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Key = process.env.REACT_APP_GOOGLE_API


console.dir(parkData)

export default function Home() {
    const [selectedPark, setSelectedPark] = useState(null)
    const [location, setLocation] = useState(center)
    const [blockedLocation, setBlockedLocation] = useState(0)
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState("")
    const API = apiUrl();
    console.log()

    const getUser = async (user) => {
        if (user) {

            try {
                let res = await axios.get(`${API}/api/users/${user}`)
                let username = res.data.user.username
                setUser(username)

            } catch (err) {
                setBlockedLocation(-1)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => {
            let center = {
                lat: data.coords.latitude,
                lng: data.coords.longitude

            }
            setLocation(center)
            // console.log(data.coords.latitude, data.coords.longitude)}
        }, (err) => {
            console.log(err, "could not get location")
        })

        if (currentUser) {
            // setUser(currentUser.email)
            getUser(currentUser.email);
        } else {
            setUser("No User")
        }

    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: Key,
        libraries
    })

    if (loadError) return "Error loading maps"
    if (!isLoaded) return "maps loading"

    return (
        <div>
            <h1 >City HoopZ HomePage</h1>
            {user}
            {blockedLocation < 0 ? null : <p>Location Blocked: Please allow app to use your location to function properly</p>}
            <div>
                <h1 className="title">
                    CityHoopZ<span role="img" aria-label="basketball">🏀</span>
                </h1>
                <GoogleMap mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={location}
                    options={options}
                >
                    {parkData.map((park, ind) =>
                        <Marker key={ind}
                            position={{ lat: Number(park.lat), lng: Number(park.lon) }}
                            onClick={() => {
                                setSelectedPark(park)
                            }}
                        />
                    )}
                    {selectedPark && (
                        <InfoWindow
                            position={{
                                lat: Number(selectedPark.lat), lng: Number(selectedPark.lon)
                            }}
                            onCloseClick={() => { setSelectedPark(null) }}
                        // icon ={{

                        // }}
                        >
                            <div>
                                <h1>{selectedPark.Name}</h1>
                                <p>{selectedPark.Location}</p>
                                <p>{selectedPark.Accessible}</p>
                                <p>{selectedPark.Num_of_Courts}</p>
                            </div>

                        </InfoWindow>)}

                </GoogleMap>


                {/* <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1wMjHq3p-4tBmB_8xABUvE7MggZNyRPIp&zoom=25&center=40.826149,-73.920273" width="640" height="480"></iframe> */}
            </div>
        </div>
    )
}