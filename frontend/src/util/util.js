export const apiUrl = () =>{
    return window.location.hostname === "localhost"?
    "http://localhost:3001" : ""
}