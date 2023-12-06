import {db} from "./config"

import { collection, addDoc , getDocs , query , where, deleteDoc, doc  } from "firebase/firestore"; 


// global constants 
const collectionName = "files"

export const addDataToFirebase = async ( filename , link , size , type , uid)=>{
    let doc = null,
    error = null
    const date = new Date()
    try {
        const docRef = await addDoc(collection(db, "files"), {
         createdAtDate: date.toLocaleDateString(),
         createdAtTime: `${date.getHours()} : ${date.getMinutes()+1} : ${date.getSeconds()} `,
         filename : filename,
         link : link,
         size : size,
         type : type,
         uid : uid
        });
        doc = docRef.id
      } catch (e) {
       error = e
      }

      return {doc , error}
}


export const makeDateReadable = async(firebaseDate)=> {
        const date = firebaseDate.toDate()
        
        const day = date.getDate()
        const year = date.getFullYear()
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = monthNames[date.getMonth()]
    
        let hours = date.getHours()
        let minutes = date.getMinutes()
        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
    
        return `${day} ${month} ${year} - ${hours}:${minutes}`
}


export const getFirebaseData = async(id)=>{
    let docs = []
    const q = query(collection(db, collectionName), where("uid", "==", id));    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        docs.push({
            docId : doc.id,
            doc : doc.data()
        })
    });
return docs
    
}


export const deleteDataFromFirebase = async(docId)=>{
    await deleteDoc(doc(db, collectionName, docId));
}