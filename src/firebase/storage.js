import { ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import { storage } from "./config";



export const uploadFile = async(file) =>{
    const storageRef = ref(storage , "/images" + file.name);
    const snapshot = await  uploadBytes(storageRef, file)
    console.log(snapshot);  
}

export const downloadFile = async(file)=>{
    const url = await getDownloadURL(ref(storage , "/images" + file.name))
    return url
}