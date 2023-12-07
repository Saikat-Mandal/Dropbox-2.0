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

export const getFirebaseData = async(id)=>{
    let docs = []
    try {
        const q = query(collection(db, collectionName), where("uid", "==", id));    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docs.push({
                docId : doc.id,
                doc : doc.data()
            })
        });
    } catch (error) {
        console.log(error);
    }
    return docs
    
}


export const deleteDataFromFirebase = async(docId)=>{
    try {
        await deleteDoc(doc(db, collectionName, docId)); 
    } catch (error) {
        console.log(error);
    }
}