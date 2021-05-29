import firebase, {storage} from "../firebase"




export const logout = () => firebase.auth().signOut() 

export const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signup = (email, password) => firebase.auth().createUserWithEmailAndPassword(email,password);

export const getFirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);

export const uploadImage = async (image) =>{
    await storage.ref(`images/${image.name}`).put(image);
    const url = await storage.ref(`images/${image.name}`).getDownloadURL()
    return url;
}  