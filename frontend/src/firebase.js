import app from "firebase/app"
import "firebase/auth";
import "firebase/storage"

const {
    REACT_APP_APIKEY, 
    REACT_APP_AUTHDOMAIN,
    REACT_APP_PROJECTID,
    REACT_APP_STORAGEBUCKET,
    REACT_APP_MESSAGINGSENDERID,
    REACT_APP_APPID,
    REACT_APP_MEASUERMENTID,
} = process.env

const config = {
    apiKey: REACT_APP_APIKEY, 
    authDomain: REACT_APP_AUTHDOMAIN,
    projectID: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderID: REACT_APP_MESSAGINGSENDERID,
    appID: REACT_APP_APPID,
    measurementID: REACT_APP_MEASUERMENTID,
    
};

app.initializeApp(config);
export const storage = app.storage();
export default app;